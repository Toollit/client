import { serverInstance } from './axios';

export interface ProjectsBookmarkCheckAPIRes {
  success: boolean;
  message: string | null;
  data: {
    bookmarks: number[] | null;
  };
}

export const projectsBookmarkCheckFetcher = async (url: string) => {
  const response = await serverInstance.get<ProjectsBookmarkCheckAPIRes>(url);
  return response.data;
};
