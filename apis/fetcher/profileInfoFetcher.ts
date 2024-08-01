import { apiClient } from '@/apis/config/axios';
import { FetcherParams } from '@/typings/axios';

export interface MyProfile {
  email: string;
  nickname: string;
  signupType: 'google' | 'github' | 'email';
  createdAt: string;
  lastSigninAt: string;
  introduce: string | null;
  onOffline: string | null;
  place: string | null;
  contactTime: string | null;
  interests: string | null;
  career: string | null;
  skills: string | null;
}

export interface UserProfile {
  nickname: string;
  createdAt: string;
  lastSigninAt: string;
  introduce: string | null;
  onOffline: string | null;
  place: string | null;
  contactTime: string | null;
  interests: string | null;
  career: string | null;
  skills: string | null;
}

export interface ProfileInfoAPIReq {}

export interface ProfileInfoAPIRes {
  success: boolean;
  message: string | null;
  data: MyProfile | UserProfile;
}

export const profileInfoFetcher = async ({
  url,
}: FetcherParams): Promise<ProfileInfoAPIRes | undefined> => {
  const response = await apiClient.get(url);
  return response.data;
};
