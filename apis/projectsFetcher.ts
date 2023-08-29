import { serverInstance } from './axios';

export interface Project {
  id: number;
  title: string;
  views: number;
  bookmarks: number;
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
  memberNumber: number;
  recruitNumber: number;
}
export interface ProjectsAPIRes {
  success: boolean;
  message: string | null;
  data: {
    projects: Project[];
    totalPage: number;
  };
}

interface FetcherParams {
  url: string;
  args?: {
    page: string;
    tag: string;
  };
}

export const projectsFetcher = async ({ url }: FetcherParams) => {
  const response = await serverInstance.get<ProjectsAPIRes>(url);
  return response.data;
};
