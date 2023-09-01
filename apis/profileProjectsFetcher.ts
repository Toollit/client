import { serverInstance } from 'apis/axios';
import { FetcherParams } from './types';

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
  message: string | null;
  data?: {
    projects: Project[] | [];
    total: number;
  };
}

export const profileProjectsFetcher = async ({
  url,
}: FetcherParams): Promise<ProfileProjectsAPIRes | undefined> => {
  const response = await serverInstance.get(url);

  return response.data;
};
