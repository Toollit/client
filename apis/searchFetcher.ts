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

export interface SearchAPIReq {}

export interface SearchAPIRes {
  success: boolean;
  message: string | null;
  data: {
    projects: Project[];
  };
}

export const searchFetcher = async ({
  url,
}: FetcherParams): Promise<SearchAPIRes | undefined> => {
  const response = await serverInstance.get(url);
  return response.data;
};
