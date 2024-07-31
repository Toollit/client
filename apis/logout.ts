import { apiClient } from '@/apis/config/axios';
import { AUTH_ENDPOINTS } from './endpoints';

export interface LogoutAPIReq {}

export interface LogoutAPIRes {
  success: boolean;
  message: string | null;
}

export const logoutAPI = async (): Promise<LogoutAPIRes | undefined> => {
  const response = await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
  return response.data;
};
