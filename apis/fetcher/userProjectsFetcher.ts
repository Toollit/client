import { apiClient } from '@/apis/config/axios';
import { FetcherParams } from '@/typings/axios';
import { ProjectOverview } from '@/typings';

export interface UserProjectsAPIReq {}

export interface UserProjectsAPIRes {
  success: boolean;
  message: string | null;
  data: {
    projects: ProjectOverview[];
    total: number;
  };
}

export const userProjectsFetcher = async ({
  url,
}: FetcherParams): Promise<UserProjectsAPIRes | undefined> => {
  const response = await apiClient.get(url);

  return response.data;
};
