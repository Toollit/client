import { serverInstance } from './axios';

export interface ProjectsBookmarkStatusAPIRes {
  success: boolean;
  message: string | null;
  data: {
    bookmarks: number[] | null;
  };
}

interface FetcherParams {
  url: string;
  args?: {
    page: string;
    tag: string;
  };
}

export const projectsBookmarksStatusFetcher = async ({
  url,
}: FetcherParams) => {
  const response = await serverInstance.get<ProjectsBookmarkStatusAPIRes>(url);
  return response.data;
};
