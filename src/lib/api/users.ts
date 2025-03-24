
import axiosInstance from './axios-config';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  bio?: string;
  skills?: string[];
  education?: string;
  location?: string;
  joinedDate: string;
}

export interface UserCompetition {
  id: string;
  title: string;
  joinedDate: string;
  status: 'active' | 'completed' | 'upcoming';
  rank?: number;
  score?: number;
  submissions: number;
}

export interface ProfileUpdateData {
  fullName?: string;
  bio?: string;
  skills?: string[];
  education?: string;
  location?: string;
  avatar?: File;
}

/**
 * Get current user profile
 */
export const getUserProfile = async () => {
  const response = await axiosInstance.get<UserProfile>('/users/profile');
  return response.data;
};

/**
 * Get user's competitions
 */
export const getUserCompetitions = async () => {
  const response = await axiosInstance.get<UserCompetition[]>('/users/competitions');
  return response.data;
};

/**
 * Update user profile
 */
export const updateUserProfile = async (data: ProfileUpdateData) => {
  const formData = new FormData();
  
  // Append all the fields that are provided
  if (data.fullName) formData.append('fullName', data.fullName);
  if (data.bio) formData.append('bio', data.bio);
  if (data.education) formData.append('education', data.education);
  if (data.location) formData.append('location', data.location);
  if (data.avatar) formData.append('avatar', data.avatar);
  
  // Handle arrays
  if (data.skills && data.skills.length > 0) {
    data.skills.forEach((skill, index) => {
      formData.append(`skills[${index}]`, skill);
    });
  }
  
  const response = await axiosInstance.put('/users/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

/**
 * Get submissions by the user
 */
export const getUserSubmissions = async () => {
  const response = await axiosInstance.get('/users/submissions');
  return response.data;
};
