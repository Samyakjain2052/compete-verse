
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from "sonner";

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create an Axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor - add auth token to headers
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Get auth token from localStorage
    const token = localStorage.getItem('authToken');
    
    // If token exists, add it to request headers
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle common error responses
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle specific error status codes
    if (error.response) {
      const { status } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear auth data and redirect to login
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          toast.error("Session expired. Please sign in again.");
          window.location.href = '/sign-in';
          break;
        case 403:
          toast.error("You don't have permission to access this resource");
          break;
        case 404:
          toast.error("Resource not found");
          break;
        case 500:
          toast.error("Server error. Please try again later");
          break;
        default:
          // Get error message from response or use a default
          const errorMsg = error.response.data?.message || "An error occurred";
          toast.error(errorMsg);
      }
    } else if (error.request) {
      // Network error
      toast.error("Network error. Please check your internet connection");
    } else {
      toast.error("An unexpected error occurred");
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
