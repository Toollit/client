import { serverInstance } from 'apis/axios';

export interface User {
  email: string;
  nickname: string;
  signUpType: 'google' | 'github' | 'email';
  createdAt: string;
  lastLoginAt: string;
}

export interface Project {
  id: number;
  title: string;
  views: number;
  bookmarks: number;
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
}

export interface userAPIReq {}

export interface userAPIRes {
  success: boolean;
  message: null | string;
  data: User;
}

export const userFetcher = async (url: string) => {
  const response = await serverInstance.get<userAPIRes>(url);
  return response.data;
};
