
import axiosInstance from '@/lib/axios-config';

const FileService = {
  // Upload a file
  uploadFile: async (formData: FormData, path: string) => {
    const response = await axiosInstance.post<{ url: string }>(`/files/upload/${path}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  // Get downloadable link for a file
  getFileLink: async (fileId: string) => {
    const response = await axiosInstance.get<{ url: string }>(`/files/${fileId}`);
    return response.data;
  }
};

export default FileService;
