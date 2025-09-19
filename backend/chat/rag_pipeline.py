import os, json, requests, numpy as np, faiss

SERVER_HOST = "172.16.5.50"
EMBED_URL = f"http://{SERVER_HOST}:8000/v1/embeddings"
LLM_URL   = f"http://{SERVER_HOST}:8003/v1/chat/completions"

BASE_DIR = os.path.dirname(os.path.dirname(__file__))   # points to backend/
DATA_DIR = os.path.join(BASE_DIR, "..", "data", "vectorstore")

INDEX_FILE  = os.path.abspath(os.path.join(DATA_DIR, "faiss_index.bin"))
META_FILE   = os.path.abspath(os.path.join(DATA_DIR, "faiss_metadata.json"))
EMB_JSON    = os.path.abspath(os.path.join(DATA_DIR, "embeddings.json"))
CHUNKS_JSON = os.path.abspath(os.path.join(DATA_DIR, "chunks.json"))

class RAGPipeline:
    def __init__(self):
        self.index = None
        self.metadata = None
        self.chunk_lookup = None

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
                lookup[(item["file_name"], item["chunk_id"])] = item.get("text","")
        if not lookup and os.path.exists(CHUNKS_JSON):
            with open(CHUNKS_JSON, "r", encoding="utf-8") as f:
                chunks = json.load(f)
            for c in chunks:
                lookup[(c["file_name"], c["chunk_id"])] = c.get("text","")
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
- If context lacks answer, say "I don't know" safely.
"""

    def call_llm(self, prompt):
        payload = {
            "model": "meta/llama-3.1-8b-instruct",
            "messages": [
                {"role":"system","content":"You are a helpful assistant for appliance manuals."},
                {"role":"user","content": prompt}
            ],
            "temperature":0.2, "max_tokens":512
        }
        r = requests.post(LLM_URL, json=payload, timeout=60)
        r.raise_for_status()
        return r.json()["choices"][0]["message"]["content"]

    def answer_query(self, query):
        self.ensure_loaded()
        qvec = self.embed_query(query)
        retrieved = self.retrieve(qvec)
        prompt = self.build_prompt(query, retrieved)
        return self.call_llm(prompt), retrieved
