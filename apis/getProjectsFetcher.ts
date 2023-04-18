import { serverInstance } from './axios';

export interface Project {
  id: number;
  title: string;
  views: number;
  bookmarks: number;
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
}
export interface GetProjectsAPIRes {
  success: boolean;
  message: string | null;
  data: {
    projects: Project[];
  };
}

export const getProjectsFetcher = async (url: string) => {
  const response = await serverInstance.get<GetProjectsAPIRes>(url);
  return response.data.data.projects;
};
