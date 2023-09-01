import { serverInstance } from './axios';
import { FetcherParams } from './types';

export interface ProjectsBookmarkStatusAPIReq {}

export interface ProjectsBookmarkStatusAPIRes {
  success: boolean;
  message: string | null;
  data: {
    bookmarks: number[] | null;
  };
}

export const projectsBookmarksStatusFetcher = async ({
  url,
}: FetcherParams): Promise<ProjectsBookmarkStatusAPIRes | undefined> => {
  const response = await serverInstance.get(url);
  return response.data;
};
