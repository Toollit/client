import { serverInstance } from 'apis/axios';

export interface SignupAPIReq {
  email: string;
  password: string;
  signupType: 'google' | 'github' | 'email';
}

export interface SignupAPIRes {
  success: boolean;
  message: string | null;
}

export const signupAPI = async (
  data: SignupAPIReq,
): Promise<SignupAPIRes | undefined> => {
  const response = await serverInstance.post('/api/user/signup', data);
  return response.data;
};
