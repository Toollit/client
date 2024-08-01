import { apiClient } from '@/apis/config/axios';
import { FetcherParams } from '@/typings/axios';

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
  const response = await apiClient.get(url);
  return response.data;
};
