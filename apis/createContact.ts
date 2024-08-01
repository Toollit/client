import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface CreateContactAPIReq {
  title: string;
  type: string;
  content: string;
}

export interface CreateContactAPIRes {
  success: boolean;
  message: string | null;
}

export const createContactAPI = async <T extends CreateContactAPIReq>(
  data: T,
): Promise<CreateContactAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.CREATE.CONTACT, data);
  return response.data;
};
