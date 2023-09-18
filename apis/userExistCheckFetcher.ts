import { serverInstance } from './axios';
import { FetcherParams } from './types';

export interface UserExistCheckAPIReq {}

export interface UserExistCheckAPIRes {
  success: boolean;
  message: string | null;
  data: {
    existUser: boolean;
  };
}

export const userExistCheckFetcher = async ({
  url,
}: FetcherParams): Promise<UserExistCheckAPIRes | undefined> => {
  const response = await serverInstance.get(url);
  return response.data;
};
