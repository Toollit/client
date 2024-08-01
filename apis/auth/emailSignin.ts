import { apiClient } from '@/apis/config/axios';
import { AUTH_ENDPOINTS } from '../endpoints';

export interface EmailSigninAPIReq {
  email: string;
  password: string;
}

export interface EmailSigninAPIRes {
  success: boolean;
  message: string | null;
  data: {
    nickname: string | null;
    needResetPassword: boolean;
  };
}

export const emailSigninAPI = async <T extends EmailSigninAPIReq>(
  data: T,
): Promise<EmailSigninAPIRes | undefined> => {
  const response = await apiClient.post(AUTH_ENDPOINTS.SIGNIN, data);
  return response.data;
};
