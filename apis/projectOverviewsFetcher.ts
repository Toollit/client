import { serverInstance } from './axios';
import { FetcherParams } from '@/typings/axios';
import { ProjectOverview } from '@/typings';

export interface ProjectOverviewsAPIReq {}

export interface ProjectOverviewsAPIRes {
  success: boolean;
  message: string | null;
  data: {
    projectOverviews: ProjectOverview[];
    totalPage: number;
  };
}

export const projectOverviewsFetcher = async ({
  url,
}: FetcherParams): Promise<ProjectOverviewsAPIRes | undefined> => {
  const response = await serverInstance.get(url);
  return response.data;
};
