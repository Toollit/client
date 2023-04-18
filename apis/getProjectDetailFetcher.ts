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

export const getProjectDetailFetcher = async (url: string) => {
  const response = await serverInstance.get<GetProjectDetailAPIRes>(url);
  return response.data.data;
};
