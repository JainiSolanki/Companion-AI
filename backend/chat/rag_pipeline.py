# backend/chat/rag_pipeline.py
import os
import json
import requests
import numpy as np
import faiss

SERVER_HOST = "172.16.5.50"
EMBED_URL = f"http://{SERVER_HOST}:8000/v1/embeddings"
LLM_URL = f"http://{SERVER_HOST}:8003/v1/chat/completions"

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, "..", "data", "vectorstore")

INDEX_FILE = os.path.abspath(os.path.join(DATA_DIR, "faiss_index.bin"))
META_FILE = os.path.abspath(os.path.join(DATA_DIR, "faiss_metadata.json"))
EMB_JSON = os.path.abspath(os.path.join(DATA_DIR, "embeddings.json"))
CHUNKS_JSON = os.path.abspath(os.path.join(DATA_DIR, "chunks.json"))

# ----- Support info mapping (realistic examples; edit to your real links/numbers) -----
SUPPORT_INFO = {
    "lg": {
        "refrigerator": {
            "toll_free": "1800-315-9999",
            "youtube": "https://www.youtube.com/watch?v=LG_fridge_demo",
            "manual_link": "https://www.lg.com/in/support/manuals"
        },
        "washing-machine": {
            "toll_free": "1800-315-9999",
            "youtube": "https://www.youtube.com/watch?v=LG_wm_demo",
            "manual_link": "https://www.lg.com/in/support/washing-machine-manuals"
        },
    },
    "samsung": {
        "refrigerator": {
            "toll_free": "1800-40-7267864",
            "youtube": "https://www.youtube.com/watch?v=Samsung_fridge_demo",
            "manual_link": "https://www.samsung.com/in/support/manuals"
        },
        "washing-machine": {
            "toll_free": "1800-40-7267864",
            "youtube": "https://www.youtube.com/watch?v=Samsung_wm_demo",
            "manual_link": "https://www.samsung.com/in/support/washing-machine-manuals"
        },
    }
}
# --------------------------------------------------------------------------------------

# quick appliance synonyms used for detection
APPLIANCE_SYNONYMS = {
    "refrigerator": ["refrigerator", "fridge", "fridges"],
    "washing-machine": ["washing machine", "washing-machine", "washing", "washer", "washers"],
    "dishwasher": ["dishwasher", "dish washers", "dishwashing"],
    # add more if you index more appliance types
}

# keywords that indicate a heavy repair
BIG_REPAIR_KEYWORDS = [
    "replace motor", "replace drum", "replace compressor", "replace motor",
    "wiring", "electrical repair", "major repair", "cannot be fixed", "seized"
]

class RAGPipeline:
    def __init__(self):
        self.index = None
        self.metadata = None
        self.chunk_lookup = None
        # per-session small state so follow-ups work without DB changes
        # mapping: session_id -> last assistant response (string)
        self.session_contexts = {}

    def ensure_loaded(self):
        if self.index is None or self.metadata is None:
            self.index, self.metadata = self.load_index_and_metadata()
            self.chunk_lookup = self.build_chunk_lookup()

    def load_index_and_metadata(self):
        index = faiss.read_index(INDEX_FILE)
        with open(META_FILE, "r", encoding="utf-8") as f:
            metadata = json.load(f)
        return index, metadata

    def build_chunk_lookup(self):
        lookup = {}
        if os.path.exists(EMB_JSON):
            with open(EMB_JSON, "r", encoding="utf-8") as f:
                embd = json.load(f)
            for item in embd:
                lookup[(item["file_name"], item["chunk_id"])] = item.get("text", "")
        if not lookup and os.path.exists(CHUNKS_JSON):
            with open(CHUNKS_JSON, "r", encoding="utf-8") as f:
                chunks = json.load(f)
            for c in chunks:
                lookup[(c["file_name"], c["chunk_id"])] = c.get("text", "")
        return lookup

    def embed_query(self, query_text):
        payload = {"model": "nvidia/llama-3.2-nv-embedqa-1b-v2",
                   "input": [query_text], "input_type": "query"}
        r = requests.post(EMBED_URL, json=payload, timeout=30)
        r.raise_for_status()
        return np.array(r.json()["data"][0]["embedding"], dtype="float32").reshape(1, -1)

    def retrieve(self, qvec, k=4):
        D, I = self.index.search(qvec, k)
        results = []
        for dist, idx in zip(D[0], I[0]):
            meta = self.metadata[idx]
            txt = self.chunk_lookup.get((meta["file_name"], meta["chunk_id"]), "")
            results.append({
                "file_name": meta["file_name"],
                "chunk_id": meta["chunk_id"],
                "distance": float(dist),
                "text": txt
            })
        return results

    def build_prompt(self, user_query, retrieved):
        context = "\n\n".join(
            f"[SOURCE: {r['file_name']}#{r['chunk_id']}]\n{r['text'][:1500]}"
            for r in retrieved if r['text']
        )
        return f"""You are a helpful assistant for appliance manuals.

CONTEXT:
{context}

QUESTION:
{user_query}

INSTRUCTIONS:
- Answer clearly in simple steps.
- Cite sources like [SOURCE: filename#chunkID].
- If the task involves advanced repair (e.g., replacing motor, drum, wiring), state that it's a professional repair and advise calling customer support.
- If context lacks answer, reply: "I don't know" and suggest contacting support or checking the manual.
"""

    def call_llm(self, prompt):
        payload = {
            "model": "meta/llama-3.1-8b-instruct",
            "messages": [
                {"role": "system", "content": "You are a helpful assistant for appliance manuals."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.2, "max_tokens": 512
        }
        r = requests.post(LLM_URL, json=payload, timeout=60)
        r.raise_for_status()
        return r.json()["choices"][0]["message"]["content"]

    def _mentions_other_appliance(self, query_lower, active_appliance):
        """Return True if the query mentions an appliance **different** from active_appliance."""
        for ap_key, aliases in APPLIANCE_SYNONYMS.items():
            if active_appliance and ap_key == active_appliance.lower():
                continue
            for alias in aliases:
                if alias in query_lower:
                    return True
        return False

    def answer_query(self, query, appliance=None, brand=None, session_id=None):
        """
        query: user text
        appliance: the active appliance string e.g. "refrigerator" or "washing-machine"
        brand: e.g. "LG"
        session_id: session identifier (used for follow-up context)
        """
        self.ensure_loaded()
        q_lower = (query or "").lower().strip()

        # 1) block queries that explicitly mention a different appliance than the session
        if appliance and self._mentions_other_appliance(q_lower, appliance):
            return (
                f"❌ You're currently in the {brand} {appliance} section. "
                "Please ask questions related only to this appliance. For other appliances, start a new session.",
                []
            )

        # 2) handle follow-ups: if user asks 'more'/'explain' etc. prepend previous response
        prev = None
        if session_id:
            prev = self.session_contexts.get(session_id)

        if prev and any(token in q_lower for token in ["more", "explain", "tell me more", "details", "detail", "this"]):
            # attach previous assistant response before querying embeddings/LLM
            query_for_embedding = f"{prev}\n\nUser follow-up: {query}"
        else:
            query_for_embedding = query

        # 3) retrieve/RAG
        qvec = self.embed_query(query_for_embedding)
        retrieved = self.retrieve(qvec)

        prompt = self.build_prompt(query_for_embedding, retrieved)
        llm_response = self.call_llm(prompt)

        # 4) store last assistant response for follow-ups (per-session)
        if session_id:
            self.session_contexts[session_id] = llm_response

        # 5) detect big repair and append support info if available
        enriched = llm_response
        info = {}
        if brand and appliance:
            info = SUPPORT_INFO.get(brand.lower(), {}).get(appliance.lower(), {})

        # If big repair keywords found in user query, strongly advise professional service
        if any(kw in q_lower for kw in BIG_REPAIR_KEYWORDS):
            enriched += "\n\n⚠️ This appears to be a major repair that likely requires a technician. " \
                        "Please contact customer support or a certified technician."
            if info.get("toll_free"):
                enriched += f" 📞 {info['toll_free']}"

        # Append support info (if any) to the response to make it actionable
        if info:
            enriched += "\n\n---\nHelpful resources:\n"
            if info.get("toll_free"):
                enriched += f"📞 Support: {info['toll_free']}\n"
            if info.get("manual_link"):
                enriched += f"📘 Manual / docs: {info['manual_link']}\n"
            if info.get("youtube"):
                enriched += f"▶️ Troubleshooting video: {info['youtube']}\n"

        return enriched, retrieved
