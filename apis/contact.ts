import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface ContactAPIReq {
  title: string;
  type: string;
  content: string;
}

export interface ContactAPIRes {
  success: boolean;
  message: string | null;
}

export const contactAPI = async <T extends ContactAPIReq>(
  data: T,
): Promise<ContactAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.CREATE.CONTACT, data);
  return response.data;
};
