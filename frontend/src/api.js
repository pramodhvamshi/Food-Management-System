import axios from "axios";

// Base API URL (from Vercel env variable or fallback)
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://food-management-system-d9mt.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach JWT token automatically
api.interceptors.request.use(
  (config) => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (error) {
      console.error("Token parsing error:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
