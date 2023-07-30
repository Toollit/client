import { serverInstance } from 'apis/axios';

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
  message: null | string;
  data?: MyProfile | UserProfile;
}

export const profileInfoFetcher = async (url: string) => {
  const response = await serverInstance.get<ProfileInfoAPIRes>(url);
  return response.data;
};
