
import axiosInstance from '@/lib/axios-config';
import { UserProfile } from '@/types/user';
import { Competition } from '@/types/competition';

const UserService = {
  // Get user profile data
  getUserProfile: async () => {
    const response = await axiosInstance.get<UserProfile>('/users/profile');
    return response.data;
  },
  
  // Update user profile
  updateUserProfile: async (profileData: Partial<UserProfile>) => {
    const response = await axiosInstance.put<UserProfile>('/users/profile', profileData);
    return response.data;
  },
  
  // Get competitions the user has joined
  getUserCompetitions: async () => {
    const response = await axiosInstance.get<Competition[]>('/users/competitions');
    return response.data;
  },
  
  // Get user submissions for a specific competition
  getUserSubmissions: async (competitionId: string) => {
    const response = await axiosInstance.get(`/users/submissions/${competitionId}`);
    return response.data;
  },
  
  // Upload profile picture
  uploadProfilePicture: async (formData: FormData) => {
    const response = await axiosInstance.post<{ imageUrl: string }>('/users/profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

export default UserService;
