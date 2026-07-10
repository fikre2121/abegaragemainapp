import axios from "axios";

// 1. Create instance with default configurations
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, // Timeout request after 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Request Interceptor: Automatically inject your JWT Bearer token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Matches your backend authMiddleware!
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 3. Response Interceptor: Catch global errors (like 401 unauthenticated or 500 server crashes)
apiClient.interceptors.response.use(
  (response) => response.data, // Strip Axios metadata wrapper and return pure backend payload data directly
  (error) => {
    // If backend returns a 401 or 403, you can auto-logout the user or wipe local storage here
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.warn(
        "Session expired or unauthorized. Clearing local credentials...",
      );
      localStorage.removeItem("token");
      // Optional: window.location.href = '/login';
    }

    // Extract cleanest possible error message from your server response payload
    const fallbackMessage =
      error.response?.data?.message || "An unexpected server error occurred.";
    return Promise.reject(new Error(fallbackMessage));
  },
);

export default apiClient;
