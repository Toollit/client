import useSWR from 'swr';
import { serverInstance } from './axios';

export interface ProjectDetail {
  writer: { nickname: string; lastLoginAt: string; profileImage: string };
  content: {
    title: string;
    contentHTML: string;
    contentMarkdown: string;
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

export const getProjectDetailFetcher = async (url: string, config?: any) => {
  const response = await serverInstance.get<GetProjectDetailAPIRes>(
    url,
    config ? config : {},
  );
  return response.data.data;
};
