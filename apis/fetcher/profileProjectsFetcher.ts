import { apiClient } from '@/apis/config/axios';
import { FetcherParams } from '@/typings/axios';
import { ProjectOverview } from '@/typings';

export interface ProfileProjectsAPIReq {}

export interface ProfileProjectsAPIRes {
  success: boolean;
  message: string | null;
  data: {
    projects: ProjectOverview[];
    total: number;
  };
}

export const profileProjectsFetcher = async ({
  url,
}: FetcherParams): Promise<ProfileProjectsAPIRes | undefined> => {
  const response = await apiClient.get(url);

  return response.data;
};
