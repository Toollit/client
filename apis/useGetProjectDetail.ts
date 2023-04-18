import useSWR from 'swr';
import { serverInstance } from './axios';

export interface ProjectDetail {
  writer: { nickname: string; lastLoginAt: string; profileImage: string };
  content: {
    title: string;
    contentHTML: string;
    contentMarkdown: string | null;
    views: number;
    createdAt: string;
    updatedAt: string | null;
    hashtags: string[];
    memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
  };
  // comments: {}[];
}

export interface GetProjectDetailAPIRes {
  success: boolean;
  message: string | null;
  data: ProjectDetail;
}

export const getProjectDetailAPIKey = (projectId: string) => {
  return `/api/post/project/${projectId}`;
};

export const getProjectDetailFetcher = async (projectId: string) => {
  const response = await serverInstance.get<GetProjectDetailAPIRes>(
    `/api/post/project/${projectId}`,
  );
  return response.data.data;
};

export const useGetProjectDetail = (projectId: string) => {
  const { data, isLoading, error } = useSWR(
    `/api/post/project/${projectId}`,
    () => getProjectDetailFetcher(projectId),
  );

  return {
    data,
    isLoading,
    error,
  };
};
