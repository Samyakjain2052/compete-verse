
import axios from 'axios';
import { toast } from 'sonner';

// Set the base URL for all API requests
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create an axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage or your auth management
    const token = localStorage.getItem('authToken');
    
    // If token exists, add it to the authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different error statuses
    if (error.response) {
      // The request was made and the server responded with a status code
      const status = error.response.status;
      const message = error.response.data?.message || 'An error occurred';
      
      switch (status) {
        case 401:
          // Unauthorized - clear any auth data and redirect to login
          localStorage.removeItem('authToken');
          toast.error('Session expired. Please sign in again');
          window.location.href = '/sign-in';
          break;
        case 403:
          toast.error('You do not have permission to perform this action');
          break;
        case 404:
          toast.error('Resource not found');
          break;
        case 500:
          toast.error('Server error. Please try again later');
          break;
        default:
          toast.error(message);
      }
    } else if (error.request) {
      // The request was made but no response was received
      toast.error('No response from server. Please check your connection');
    } else {
      // Something happened in setting up the request
      toast.error('Request failed. Please try again');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
