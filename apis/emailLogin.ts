import { serverInstance } from './axios';

export interface EmailLoginAPIReq {
  email: string;
  password: string;
}

export interface EmailLoginAPIRes {
  success: boolean;
  message: string | null;
}

export const emailLoginAPI = async ({
  email,
  password,
}: EmailLoginAPIReq): Promise<EmailLoginAPIRes | undefined> => {
  const response = await serverInstance.post('/api/user/login', {
    email,
    password,
  });
  return response.data;
};
