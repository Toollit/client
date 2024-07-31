import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface DeleteAccountAPIReq {}

export interface DeleteAccountAPIRes {
  success: boolean;
  message: string | null;
}

export const deleteAccountAPI = async <T extends DeleteAccountAPIReq>(
  data: T,
): Promise<DeleteAccountAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.DELETE.ACCOUNT, data);
  return response.data;
};
