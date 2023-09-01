import { serverInstance } from './axios';
import { FetcherParams } from './types';

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
    recruitNumber: number;
  };
  // comments: {}[];
}

export interface ProjectDetailAPIReq {}

export interface ProjectDetailAPIRes {
  success: boolean;
  message: string | null;
  data: ProjectDetail;
}

export const projectDetailFetcher = async ({
  url,
  config,
}: FetcherParams): Promise<ProjectDetailAPIRes | undefined> => {
  const response = await serverInstance.get(url, config ? { ...config } : {});
  return response.data;
};
