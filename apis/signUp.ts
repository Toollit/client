import { serverInstance } from 'apis/axios';

export interface SignUpData {
  email: string;
  password: string;
  signUpType: 'google' | 'github' | 'email';
}

export interface SignUpApiRes {
  success: boolean;
  message: string;
}

export const signUpAPI = async (
  data: SignUpData,
): Promise<SignUpApiRes | undefined> => {
  const response = await serverInstance.post('/api/user/signUp', data);
  return response.data;
};
