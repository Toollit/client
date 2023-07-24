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

export interface profileProjectsAPIReq {}

export interface profileProjectsAPIRes {
  success: boolean;
  message: null | string;
  data?: {
    projects: Project[];
    total: number;
  };
}

export const profileProjectsFetcher = async (url: string) => {
  const response = await serverInstance.get<profileProjectsAPIRes>(url);

  return response.data;
};
