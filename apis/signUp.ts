import { serverInstance } from 'apis/axios';

export interface SignUpAPIReq {
  email: string;
  password: string;
  signUpType: 'google' | 'github' | 'email';
  nickname: string;
}

export interface SignUpAPIRes {
  success: boolean;
  message: string | null;
}

export const signUpAPI = async (
  data: SignUpAPIReq,
): Promise<SignUpAPIRes | undefined> => {
  const response = await serverInstance.post('/api/user/signUp', data);
  return response.data;
};
