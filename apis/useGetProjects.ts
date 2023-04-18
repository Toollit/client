import useSWR from 'swr';
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

export const getProjectsAPIKey = '/api/post/projects';

export const getProjectsFetcher = async () => {
  const response = await serverInstance.get<GetProjectsAPIRes>(
    getProjectsAPIKey,
  );
  return response.data.data.projects;
};

export const useGetProjects = () => {
  const { data, isLoading, error } = useSWR(
    getProjectsAPIKey,
    getProjectsFetcher,
  );

  return {
    data,
    isLoading,
    error,
  };
};
