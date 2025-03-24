
import axiosInstance from './axios-config';

export interface CompetitionData {
  id: string;
  title: string;
  host: string;
  hostLogo: string;
  deadlineDate: string;
  startDate: string;
  daysLeft: number;
  maxAge?: number;
  participants: number;
  category: string;
  prize: string;
  overview: string;
  rules: string;
  datasets?: Array<{
    id: string;
    name: string;
    size: string;
    format: string;
  }>;
  leaderboard?: Array<{
    position: number;
    name: string;
    score: number;
    change: number;
  }>;
  discussion?: Array<{
    id: string;
    author: string;
    avatar: string;
    date: string;
    content: string;
    pinned: boolean;
    replies: Array<{
      id: string;
      author: string;
      avatar: string;
      date: string;
      content: string;
    }>;
  }>;
}

export interface SubmissionData {
  competitionId: string;
  fileUrl: string;
  notes?: string;
}

export interface VerifyIdData {
  competitionId: string;
  idImageUrl: string;
  fullName: string;
  dateOfBirth: string;
}

/**
 * Get all competitions
 */
export const getCompetitions = async () => {
  const response = await axiosInstance.get<CompetitionData[]>('/competitions');
  return response.data;
};

/**
 * Get a competition by ID
 */
export const getCompetitionById = async (id: string) => {
  const response = await axiosInstance.get<CompetitionData>(`/competitions/${id}`);
  return response.data;
};

/**
 * Join a competition
 */
export const joinCompetition = async (competitionId: string) => {
  const response = await axiosInstance.post(`/competitions/${competitionId}/join`);
  return response.data;
};

/**
 * Submit a solution for a competition
 */
export const submitSolution = async (data: SubmissionData) => {
  const formData = new FormData();
  formData.append('competitionId', data.competitionId);
  formData.append('fileUrl', data.fileUrl);
  
  if (data.notes) {
    formData.append('notes', data.notes);
  }
  
  const response = await axiosInstance.post('/submissions', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

/**
 * Verify ID for age-restricted competitions
 */
export const verifyId = async (data: VerifyIdData) => {
  const formData = new FormData();
  formData.append('competitionId', data.competitionId);
  formData.append('idImageUrl', data.idImageUrl);
  formData.append('fullName', data.fullName);
  formData.append('dateOfBirth', data.dateOfBirth);
  
  const response = await axiosInstance.post('/verify-id', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};
