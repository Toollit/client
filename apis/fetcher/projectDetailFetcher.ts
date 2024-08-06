import { apiClient } from '@/apis/config/axios';
import { FetcherParams } from '@/typings/axios';
import { ProjectDetail } from '@/typings';

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
  const response = await apiClient.get(url, config ? { ...config } : {});
  return response.data;
};
