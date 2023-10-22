import { serverInstance } from './axios';
import { FetcherParams } from './types';

export interface Project {
  id: number;
  title: string;
  views: number;
  bookmarkCount: number;
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
  memberCount: number;
  recruitCount: number;
  representativeImage: string;
}

export interface ProjectsAPIReq {}

export interface ProjectsAPIRes {
  success: boolean;
  message: string | null;
  data: {
    projects: Project[];
    totalPage: number;
  };
}

export const projectsFetcher = async ({
  url,
}: FetcherParams): Promise<ProjectsAPIRes | undefined> => {
  const response = await serverInstance.get(url);
  return response.data;
};
