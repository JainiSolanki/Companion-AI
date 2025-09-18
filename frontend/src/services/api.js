import axios from "axios";


//const API_BASE_URL = "http://localhost:5000/api";
// prefer environment variable (Vite uses import.meta.env.VITE_*)
const API_BASE_URL = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";


// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (email, password) => api.post("/auth/login/", { email, password }),

  signup: (username, email, password) =>
    api.post("/auth/signup/", { username, email, password }),

  verifyToken: () => api.get("/auth/verify"),

  refreshToken: () => api.post("/auth/refresh"),
};

// Chat API calls
export const chatAPI = {
  //sendMessage: (message, appliance) =>
   // api.post("/chat/message", { message, appliance }),
  sendMessage: (message, { appliance, brand }) =>
  api.post("/chat/", { message, appliance, brand }),

  getMaintenanceTips: (appliance) => api.get(`/chat/tips/${appliance}`),

  getChatHistory: () => api.get("/chat/"),

  clearChatHistory: () => api.delete("/chat/history"),
};

// Appliance API calls
export const applianceAPI = {
  getCategories: () => api.get("/appliances/categories"),

  getModels: (category) => api.get(`/appliances/${category}/models`),

  uploadManual: (file, applianceId) => {
    const formData = new FormData();
    formData.append("manual", file);
    formData.append("applianceId", applianceId);

    return api.post("/appliances/upload-manual", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default api;
