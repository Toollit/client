import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface UpdatePasswordAPIReq {
  password: string;
}

export interface UpdatePasswordAPIRes {
  success: boolean;
  message: string | null;
}

export const updatePasswordAPI = async <T extends UpdatePasswordAPIReq>(
  data: T,
): Promise<UpdatePasswordAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.UPDATE.PASSWORD, data);
  return response.data;
};
