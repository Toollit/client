import { serverInstance } from 'apis/axios';
import { FetcherParams } from './types';

export interface MyProfile {
  email: string;
  nickname: string;
  signUpType: 'google' | 'github' | 'email';
  createdAt: string;
  lastLoginAt: string;
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
  lastLoginAt: string;
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
  data?: MyProfile | UserProfile;
}

export const profileInfoFetcher = async ({
  url,
}: FetcherParams): Promise<ProfileInfoAPIRes | undefined> => {
  const response = await serverInstance.get(url);
  return response.data;
};
