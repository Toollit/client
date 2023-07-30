import { serverInstance } from 'apis/axios';

export interface Project {
  id: number;
  title: string;
  views: number;
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
  memberNumber: number;
  recruitNumber: number;
}

export interface ProfileProjectsAPIReq {}

export interface ProfileProjectsAPIRes {
  success: boolean;
  message: null | string;
  data?: {
    projects: Project[] | null;
    total: number;
  };
}

export const profileProjectsFetcher = async (url: string) => {
  const response = await serverInstance.get<ProfileProjectsAPIRes>(url);

  return response.data;
};
