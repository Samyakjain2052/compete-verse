
import axiosInstance from '@/lib/axios-config';

const VerificationService = {
  // Verify user age from ID document
  verifyAge: async (imageUrl: string) => {
    const response = await axiosInstance.post<{ age: number }>('/verify-age', {
      image_url: imageUrl
    });
    return response.data;
  }
};

export default VerificationService;
