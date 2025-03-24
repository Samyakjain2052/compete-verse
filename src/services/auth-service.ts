
import axiosInstance from '@/lib/axios-config';
import { User } from '@/types/user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  role: "participant" | "host";
}

const AuthService = {
  login: async (credentials: LoginCredentials) => {
    const response = await axiosInstance.post<{ token: string; user: User }>('/auth/login', credentials);
    
    // Save token and user data to localStorage
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  },
  
  register: async (data: RegisterData) => {
    const response = await axiosInstance.post<{ token: string; user: User }>('/auth/register', data);
    
    // Save token and user data to localStorage
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  // Method to check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

export default AuthService;
