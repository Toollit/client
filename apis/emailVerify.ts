import { apiClient } from '@/apis/config/axios';

export interface EmailVerifyAPIReq {
  email: string;
  authCode: string;
}

export interface EmailVerifyAPIRes {
  success: boolean;
  message: string | null;
}

export const emailVerifyAPI = async ({
  email,
  authCode,
}: EmailVerifyAPIReq): Promise<EmailVerifyAPIRes | undefined> => {
  const response = await apiClient.post('/api/auth/email/verify', {
    email,
    authCode,
  });
  return response.data;
};
