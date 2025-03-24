
import axiosInstance from './axios-config';

/**
 * Upload a file to the server
 */
export const uploadFile = async (file: File, folder: string = 'general') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);
  
  const response = await axiosInstance.post('/uploads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data.fileUrl;
};

/**
 * Delete a file from the server
 */
export const deleteFile = async (fileUrl: string) => {
  const response = await axiosInstance.delete('/uploads', {
    data: { fileUrl },
  });
  
  return response.data;
};
