import { apiClient } from '@/apis/config/axios';
import { FetcherParams } from '@/typings/axios';

export interface AuthAPIReq {}

export interface AuthAPIRes {
  success: boolean;
  message: string | null;
  data: {
    nickname: string | null;
    needResetPassword: boolean;
  };
}

export const authFetcher = async ({
  url,
}: FetcherParams): Promise<AuthAPIRes | undefined> => {
  const response = await apiClient.get(url);
  return response.data;
};
