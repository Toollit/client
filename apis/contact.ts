import { apiClient } from '@/apis/config/axios';

export interface ContactAPIReq {
  title: string;
  type: string;
  content: string;
}

export interface ContactAPIRes {
  success: boolean;
  message: string | null;
}

export const contactAPI = async (
  data: ContactAPIReq,
): Promise<ContactAPIRes | undefined> => {
  const response = await apiClient.post('/api/user/contact', data);
  return response.data;
};
