import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";



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
