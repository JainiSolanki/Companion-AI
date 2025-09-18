import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";

// Send a new chat message
export const sendMessage = async (user, message) => {
  const response = await axios.post(`${API_BASE}/chat/`, {
    user,
    message,
    timestamp: new Date().toISOString(),
  });
  return response.data;
};

// Get chat history
export const getChatHistory = async () => {
  const response = await axios.get(`${API_BASE}/chat/`);
  return response.data;
};
  