import { apiClient } from '@/apis/config/axios';
import { FetcherParams } from '@/typings/axios';
import { ProjectOverview } from '@/typings';

export interface BookmarksAPIReq {}

export interface BookmarksAPIRes {
  success: boolean;
  message: string | null;
  data: {
    bookmarks: ProjectOverview[];
    total: number;
  };
}

export const bookmarksFetcher = async ({
  url,
}: FetcherParams): Promise<BookmarksAPIRes | undefined> => {
  const response = await apiClient.get(url);
  return response.data;
};
