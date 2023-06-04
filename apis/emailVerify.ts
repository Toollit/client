import { serverInstance } from './axios';

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
}: EmailVerifyAPIReq) => {
  const response = await serverInstance.post<EmailVerifyAPIRes>(
    '/api/auth/verify',
    { email, authCode },
  );
  return response.data;
};
