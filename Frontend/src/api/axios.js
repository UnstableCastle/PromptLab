// src/api/axios.js

import axios from "axios";
import { store } from "../redux/store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 15000,
});

// Request Interceptor
// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // 1. BULLETPROOF PUBLIC ROUTE BYPASS:
    // Combine baseURL and url to get the full path Axios is calling
    const fullUrl = `${config.baseURL || ""}${config.url || ""}`;

    // Check if the full URL contains /auth/ OR your specific public endpoints
    if (
      fullUrl.includes("/auth/") ||
      fullUrl.includes("/reset-password") ||
      fullUrl.includes("/forgot-password")
    ) {
      // Return immediately WITHOUT adding an Authorization header
      return config;
    }

    const storageToken = localStorage.getItem("accessToken");
    const stateToken = store.getState().auth?.accessToken;

    // 2. ATTACH TOKEN WITH SAFETY CHECKS:
    if (stateToken && stateToken !== "undefined" && stateToken !== "null") {
      config.headers.Authorization = `Bearer ${stateToken}`;
    } else if (
      storageToken &&
      storageToken !== "undefined" &&
      storageToken !== "null"
    ) {
      config.headers.Authorization = `Bearer ${storageToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error("Bad Request");
          break;

        case 401:
          console.error("Unauthorized");

          // localStorage.removeItem("token");
          // window.location.href = "/login";

          break;

        case 403:
          console.error("Forbidden");
          break;

        case 404:
          console.error("Not Found");
          break;

        case 500:
          console.error("Internal Server Error");
          break;

        default:
          console.error(error.response.data);
      }
    } else {
      console.error("Network Error");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
