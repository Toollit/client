import { serverInstance } from 'apis/axios';

export interface LogoutAPIReq {}

export interface LogoutAPIRes {
  success: boolean;
  message: string;
}

export const logoutAPI = async (): Promise<LogoutAPIRes | undefined> => {
  const response = await serverInstance.post('/api/user/logout');
  return response.data;
};
