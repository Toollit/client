import { serverInstance } from 'apis/axios';

export interface User {
  email: string;
  nickname: string;
  signUpType: 'google' | 'github' | 'email';
  createdAt: string;
  lastLoginAt: string;
  introduce: string;
  onOffline: string;
  place: string;
  contactTime: string;
  interests: string;
  career: string;
  skills: string;
}

export interface Project {
  id: number;
  title: string;
  views: number;
  bookmarks: number;
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
}

export interface profileAPIReq {}

export interface profileAPIRes {
  success: boolean;
  message: null | string;
  data: User | Project[];
}

export const profileFetcher = async (url: string) => {
  const response = await serverInstance.get<profileAPIRes>(url);
  return response.data;
};
