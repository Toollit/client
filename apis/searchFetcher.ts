import { serverInstance } from './axios';
import { FetcherParams } from '@/typings/axios';
import { ProjectOverview } from '@/typings';

export interface SearchAPIReq {}

export interface SearchAPIRes {
  success: boolean;
  message: string | null;
  data: {
    projects: ProjectOverview[];
  };
}

export const searchFetcher = async ({
  url,
}: FetcherParams): Promise<SearchAPIRes | undefined> => {
  const response = await serverInstance.get(url);
  return response.data;
};
