import axios from "axios";




const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

// client axios for public third-party APIs (no credentials required)
export const client = axios.create({
  baseURL: import.meta.env.VITE_COUNTRY_API_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});
