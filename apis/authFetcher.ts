import { serverInstance } from 'apis/axios';

export interface AuthAPIReq {}

export interface AuthAPIRes {
  success: boolean;
  message: null | string;
  data?: {
    nickname: string;
  };
}

export const authFetcher = async (url: string) => {
  const response = await serverInstance.get<AuthAPIRes>(url);
  return response.data;
};
