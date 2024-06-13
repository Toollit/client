import { serverInstance } from './axios';
import { FetcherParams } from './types';

export interface UserRegisteredCheckAPIReq {}

export interface UserRegisteredCheckAPIRes {
  success: boolean;
  message: string | null;
  data: {
    registeredUser: boolean;
  };
}

export const userRegisteredCheckFetcher = async ({
  url,
}: FetcherParams): Promise<UserRegisteredCheckAPIRes | undefined> => {
  const response = await serverInstance.get(url);
  return response.data;
};
