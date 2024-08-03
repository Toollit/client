import { apiClient } from '@/apis/config/axios';
import { FetcherParams } from '@/typings/axios';
import { ProjectDetail } from '@/typings';

export interface ProjectWriter {
  nickname: string;
  lastSigninAt: string;
  profileImage: string | null;
}

export interface ProjectMember {
  profiles: {
    nickname: string;
    profileImage: string | null;
  }[];
}

export interface ProjectContent {
  writer: ProjectWriter;
  content: ProjectDetail;
  member: ProjectMember;
}

export interface ProjectAPIReq {}

export interface ProjectAPIRes {
  success: boolean;
  message: string | null;
  data: ProjectContent;
}

export const projectFetcher = async ({
  url,
  config,
}: FetcherParams): Promise<ProjectAPIRes | undefined> => {
  const response = await apiClient.get(url, config ? { ...config } : {});
  return response.data;
};