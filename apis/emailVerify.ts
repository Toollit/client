import { apiClient } from '@/apis/config/axios';
import { AUTH_ENDPOINTS } from './endpoints';

export interface EmailVerifyAPIReq {
  email: string;
  authCode: string;
}

export interface EmailVerifyAPIRes {
  success: boolean;
  message: string | null;
}

export const emailVerifyAPI = async <T extends EmailVerifyAPIReq>(
  data: T,
): Promise<EmailVerifyAPIRes | undefined> => {
  const response = await apiClient.post(AUTH_ENDPOINTS.EMAIL_VERIFY, data);
  return response.data;
};
