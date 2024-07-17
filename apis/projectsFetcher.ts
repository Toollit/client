import { serverInstance } from './axios';
import { FetcherParams } from '@/typings/axios';
import { ProjectOverview } from '@/typings';

export interface ProjectsAPIReq {}

export interface ProjectsAPIRes {
  success: boolean;
  message: string | null;
  data: {
    projects: ProjectOverview[];
    totalPage: number;
  };
}

export const projectsFetcher = async ({
  url,
}: FetcherParams): Promise<ProjectsAPIRes | undefined> => {
  const response = await serverInstance.get(url);
  return response.data;
};
