import { apiClient } from '@/apis/config/axios';
import { FetcherParams } from '@/typings/axios';

export interface ProfileImage {
  profileImage: string | null;
}

export interface UserImageAPIReq {}

export interface UserImageAPIRes {
  success: boolean;
  message: string | null;
  data: ProfileImage;
}

export const userImageFetcher = async ({
  url,
}: FetcherParams): Promise<UserImageAPIRes | undefined> => {
  const response = await apiClient.get(url);
  return response.data;
};
