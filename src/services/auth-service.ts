
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
    const response = await axiosInstance.post<{ token: string }>('/auth/login', credentials);
    
    // Save token to localStorage
    localStorage.setItem('authToken', response.data.token);
    
    // Get user profile after login
    const userResponse = await axiosInstance.get<User>('/auth/me');
    localStorage.setItem('user', JSON.stringify(userResponse.data));
    
    return { token: response.data.token, user: userResponse.data };
  },
  
  register: async (data: RegisterData) => {
    const response = await axiosInstance.post<User>('/auth/register', data);
    
    // After registration, perform login to get token
    const loginResponse = await AuthService.login({ 
      email: data.email, 
      password: data.password 
    });
    
    return loginResponse;
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
