
import axiosInstance from '@/lib/axios-config';

export interface ForumPost {
  id: number;
  competitionId: number;
  userId: number;
  userName: string;
  content: string;
  createdAt: string;
  isPinned: boolean;
}

const ForumService = {
  // Get all posts for a competition
  getCompetitionPosts: async (competitionId: string) => {
    const response = await axiosInstance.get<ForumPost[]>(`/forum/${competitionId}`);
    return response.data;
  },
  
  // Create a new post
  createPost: async (competitionId: string, content: string) => {
    const response = await axiosInstance.post<ForumPost>('/forum', {
      competitionId,
      content
    });
    return response.data;
  },
  
  // Pin a post (for competition hosts)
  pinPost: async (postId: string) => {
    const response = await axiosInstance.patch<ForumPost>(`/forum/pin/${postId}`);
    return response.data;
  }
};

export default ForumService;
