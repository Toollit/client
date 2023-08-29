import { serverInstance } from './axios';

export interface ProjectsBookmarkStatusAPIRes {
  success: boolean;
  message: string | null;
  data: {
    bookmarks: number[] | null;
  };
}

export const projectsBookmarksStatusFetcher = async (url: string) => {
  const response = await serverInstance.get<ProjectsBookmarkStatusAPIRes>(url);
  return response.data;
};
