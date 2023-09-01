import { serverInstance } from './axios';
import { FetcherParams } from './types';

export interface ProjectDetailBookmarkStatusAPIReq {}

export interface ProjectDetailBookmarkStatusAPIRes {
  success: boolean;
  message: string | null;
  data: {
    bookmark: boolean;
  };
}

export const projectDetailBookmarkStatusFetcher = async ({
  url,
}: FetcherParams): Promise<ProjectDetailBookmarkStatusAPIRes | undefined> => {
  const response = await serverInstance.get(url);
  return response.data;
};
