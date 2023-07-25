import { serverInstance } from 'apis/axios';

export interface ProfileImage {
  profileImage: string | null;
}

export interface profileImageAPIReq {}

export interface profileImageAPIRes {
  success: boolean;
  message: null | string;
  data?: ProfileImage;
}

export const profileImageFetcher = async (url: string) => {
  const response = await serverInstance.get<profileImageAPIRes>(url);
  return response.data;
};
