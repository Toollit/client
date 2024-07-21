import { apiClient } from '@/apis/config/axios';

export interface LogoutAPIReq {}

export interface LogoutAPIRes {
  success: boolean;
  message: string | null;
}

export const logoutAPI = async (): Promise<LogoutAPIRes | undefined> => {
  const response = await apiClient.post('/api/user/logout');
  return response.data;
};
