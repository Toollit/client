import { apiClient } from '@/apis/config/axios';
import { FetcherParams } from '@/typings/axios';

export interface ProfileImage {
  profileImage: string | null;
}

export interface ProfileImageAPIReq {}

export interface ProfileImageAPIRes {
  success: boolean;
  message: string | null;
  data: ProfileImage;
}

export const profileImageFetcher = async ({
  url,
}: FetcherParams): Promise<ProfileImageAPIRes | undefined> => {
  const response = await apiClient.get(url);
  return response.data;
};
