import { apiClient } from '@/apis/config/axios';

export interface ResetPasswordAPIReq {
  password: string;
}

export interface ResetPasswordAPIRes {
  success: boolean;
  message: string | null;
}

export const resetPasswordAPI = async (
  data: ResetPasswordAPIReq,
): Promise<ResetPasswordAPIRes | undefined> => {
  const response = await apiClient.post('/api/user/resetPassword', data);
  return response.data;
};
