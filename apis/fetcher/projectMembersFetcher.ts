import { apiClient } from '@/apis/config/axios';
import { FetcherParams } from '@/typings/axios';

export interface ProjectMember {
  nickname: string;
  profileImage: string | null;
}

export interface ProjectMembersAPIReq {}

export interface ProjectMembersAPIRes {
  success: boolean;
  message: string | null;
  data: {
    members: ProjectMember[];
  };
}

export const projectMembersFetcher = async ({
  url,
}: FetcherParams): Promise<ProjectMembersAPIRes | undefined> => {
  const response = await apiClient.get(url);
  return response.data;
};
