import { serverInstance } from 'apis/axios';
import { FetcherParams } from './types';

export interface AuthAPIReq {}

export interface AuthAPIRes {
  success: boolean;
  message: string | null;
  data: {
    nickname: string | null;
  };
}

export const authFetcher = async ({
  url,
}: FetcherParams): Promise<AuthAPIRes | undefined> => {
  const response = await serverInstance.get(url);
  return response.data;
};
