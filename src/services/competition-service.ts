
import axiosInstance from '@/lib/axios-config';
import { Competition, CompetitionDetails, LeaderboardEntry } from '@/types/competition';

const CompetitionService = {
  // Get all competitions with optional filters
  getAllCompetitions: async (filters?: Record<string, any>) => {
    const response = await axiosInstance.get<Competition[]>('/competitions', { 
      params: filters 
    });
    return response.data;
  },
  
  // Get competition by ID
  getCompetitionById: async (id: string) => {
    const response = await axiosInstance.get<CompetitionDetails>(`/competitions/${id}`);
    return response.data;
  },
  
  // Join a competition
  joinCompetition: async (competitionId: string) => {
    const response = await axiosInstance.post<{ success: boolean; message: string }>(
      `/competitions/${competitionId}/join`
    );
    return response.data;
  },
  
  // Submit a solution for a competition
  submitSolution: async (competitionId: string, formData: FormData) => {
    const response = await axiosInstance.post<{ success: boolean; message: string }>(
      `/submissions`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
  
  // Verify user ID for a competition (age verification)
  verifyId: async (competitionId: string, formData: FormData) => {
    const response = await axiosInstance.post<{ success: boolean; message: string }>(
      `/competitions/${competitionId}/join`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
  
  // Get competition datasets
  getCompetitionDatasets: async (competitionId: string) => {
    const response = await axiosInstance.get<{ 
      trainData: string; 
      testData: string; 
      demoFile: string 
    }>(`/competitions/${competitionId}/datasets`);
    return response.data;
  },
  
  // Get leaderboard for a competition
  getLeaderboard: async (competitionId: string) => {
    const response = await axiosInstance.get<LeaderboardEntry[]>(
      `/competitions/${competitionId}/leaderboard`
    );
    return response.data;
  },
  
  // Create a new competition (for hosts)
  createCompetition: async (competitionData: FormData) => {
    const response = await axiosInstance.post<{ success: boolean; competitionId: string }>(
      '/competitions',
      competitionData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
  
  // Get competitions hosted by current user
  getHostedCompetitions: async () => {
    const response = await axiosInstance.get<Competition[]>('/competitions/hosted');
    return response.data;
  }
};

export default CompetitionService;
