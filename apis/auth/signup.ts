import { apiClient } from '@/apis/config/axios';
import { AUTH_ENDPOINTS } from '../endpoints';

export interface SignupAPIReq {
  email: string;
  password: string;
  signupType: 'google' | 'github' | 'email';
}

export interface SignupAPIRes {
  success: boolean;
  message: string | null;
}

export const signupAPI = async <T extends SignupAPIReq>(
  data: T,
): Promise<SignupAPIRes | undefined> => {
  const response = await apiClient.post(AUTH_ENDPOINTS.SIGNUP, data);
  return response.data;
};
