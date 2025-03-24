
import axiosInstance from './axios-config';

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
  };
  token: string;
}

/**
 * Sign in a user
 */
export const signIn = async (data: SignInData) => {
  const response = await axiosInstance.post<AuthResponse>('/auth/sign-in', data);
  
  // Store the token in localStorage
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
  }
  
  return response.data;
};

/**
 * Sign up a new user
 */
export const signUp = async (data: SignUpData) => {
  const response = await axiosInstance.post<AuthResponse>('/auth/sign-up', data);
  
  // Store the token in localStorage if auto-login after signup
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
  }
  
  return response.data;
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  // Call the backend to invalidate the token
  await axiosInstance.post('/auth/sign-out');
  
  // Remove the token from localStorage
  localStorage.removeItem('authToken');
};

/**
 * Check if the user is authenticated
 */
export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  } catch (error) {
    // If there's an error, the user is not authenticated
    return null;
  }
};

/**
 * Request password reset
 */
export const requestPasswordReset = async (email: string) => {
  const response = await axiosInstance.post('/auth/forgot-password', { email });
  return response.data;
};

/**
 * Reset password with token
 */
export const resetPassword = async (token: string, newPassword: string) => {
  const response = await axiosInstance.post('/auth/reset-password', {
    token,
    newPassword,
  });
  return response.data;
};
