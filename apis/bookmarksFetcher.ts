import { serverInstance } from 'apis/axios';
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
  const response = await serverInstance.get(url);
  return response.data;
};
