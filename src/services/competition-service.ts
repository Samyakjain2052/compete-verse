
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
    const response = await axiosInstance.post<{ message: string }>(
      `/competitions/${competitionId}/join`
    );
    return response.data;
  },
  
  // Submit a solution for a competition
  submitSolution: async (competitionId: string, submissionFile: File) => {
    const formData = new FormData();
    formData.append('competitionId', competitionId);
    formData.append('submissionFile', submissionFile);
    
    const response = await axiosInstance.post<{ 
      id: number,
      competitionId: number,
      userId: number,
      filePath: string,
      score: number,
      submittedAt: string
    }>(
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
    // Using the submissions array from the competition details as the leaderboard
    const response = await axiosInstance.get<CompetitionDetails>(`/competitions/${competitionId}`);
    return response.data.submissions as LeaderboardEntry[];
  },
  
  // Create a new competition (for hosts)
  createCompetition: async (formData: FormData) => {
    const response = await axiosInstance.post<Competition>(
      '/competitions',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return { success: true, competitionId: response.data.id.toString() };
  },
  
  // Get competitions hosted by current user
  getHostedCompetitions: async () => {
    // Since the API doesn't have a dedicated endpoint for this,
    // we'll get all competitions and filter on the client side
    const allCompetitions = await CompetitionService.getAllCompetitions();
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    return allCompetitions.filter(comp => comp.hostId === currentUser.id);
  }
};

export default CompetitionService;
