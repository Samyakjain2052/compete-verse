
import axiosInstance from '@/lib/axios-config';

export interface ForumPost {
  id: number;
  competitionId: number;
  userId: number;
  userName?: string;
  content: string;
  createdAt: string;
  isPinned: boolean;
}

const ForumService = {
  // Get all posts for a competition
  getCompetitionPosts: async (competitionId: string) => {
    const response = await axiosInstance.get<ForumPost[]>(`/forum?competitionId=${competitionId}`);
    return response.data;
  },
  
  // Get a specific post
  getPost: async (postId: string) => {
    const response = await axiosInstance.get<ForumPost>(`/forum/${postId}`);
    return response.data;
  },
  
  // Create a new post
  createPost: async (competitionId: string, content: string, isPinned: boolean = false) => {
    const response = await axiosInstance.post<ForumPost>('/forum', {
      competitionId: Number(competitionId),
      content,
      isPinned
    });
    return response.data;
  },
  
  // Update a post
  updatePost: async (postId: string, content: string, isPinned: boolean) => {
    const response = await axiosInstance.put<ForumPost>(`/forum/${postId}`, {
      content,
      isPinned
    });
    return response.data;
  },
  
  // Delete a post
  deletePost: async (postId: string) => {
    const response = await axiosInstance.delete<{ message: string }>(`/forum/${postId}`);
    return response.data;
  },
  
  // Toggle pin status (convenience method)
  togglePinStatus: async (postId: string, currentPinStatus: boolean) => {
    const post = await ForumService.getPost(postId);
    return ForumService.updatePost(postId, post.content, !currentPinStatus);
  }
};

export default ForumService;
