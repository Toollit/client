import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface ResetPasswordAPIReq {
  password: string;
}

export interface ResetPasswordAPIRes {
  success: boolean;
  message: string | null;
}

export const resetPasswordAPI = async <T extends ResetPasswordAPIReq>(
  data: T,
): Promise<ResetPasswordAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.UPDATE.RESET_PASSWORD, data);
  return response.data;
};
