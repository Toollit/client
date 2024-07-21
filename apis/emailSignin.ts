import { apiClient } from '@/apis/config/axios';

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

export const emailSigninAPI = async ({
  email,
  password,
}: EmailSigninAPIReq): Promise<EmailSigninAPIRes | undefined> => {
  const response = await apiClient.post('/api/user/signin/email', {
    email,
    password,
  });
  return response.data;
};
