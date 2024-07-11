import { serverInstance } from './axios';
import { FetcherParams } from '@/typings/axios';

export interface ProjectWriter {
  nickname: string;
  lastSigninAt: string;
  profileImage: string | null;
}

export interface ProjectContent {
  title: string;
  contentHTML: string;
  contentMarkdown: string;
  views: number;
  createdAt: string;
  updatedAt: string | null;
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
  recruitCount: number;
  representativeImage: string | null;
}

export interface ProjectMember {
  profiles: {
    nickname: string;
    profileImage: string | null;
  }[];
}

export interface ProjectDetail {
  writer: ProjectWriter;
  content: ProjectContent;
  member: ProjectMember;
}

export interface ProjectAPIReq {}

export interface ProjectAPIRes {
  success: boolean;
  message: string | null;
  data: ProjectDetail;
}

export const projectFetcher = async ({
  url,
  config,
}: FetcherParams): Promise<ProjectAPIRes | undefined> => {
  const response = await serverInstance.get(url, config ? { ...config } : {});
  return response.data;
};
