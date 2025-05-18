import axios from "axios";

// Create axios instance with base URL
export const api = axios.create({
  // Use relative URL to leverage the Vite proxy
  baseURL: "/api",
});

// Set up axios defaults and interceptors
export const setupAxiosDefaults = () => {
  // Add request interceptor to include token in requests
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

  // Add response interceptor to handle errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle unauthorized errors (401)
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/admin";
      }
      return Promise.reject(error);
    }
  );
};
