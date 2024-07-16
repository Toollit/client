import { serverInstance } from './axios';
import { FetcherParams } from '@/typings/axios';

export interface BookmarkIdsAPIReq {}

export interface BookmarkIdsAPIRes {
  success: boolean;
  message: string | null;
  data: {
    bookmarkIds: number[];
  };
}

export const bookmarkIdsFetcher = async ({
  url,
}: FetcherParams): Promise<BookmarkIdsAPIRes | undefined> => {
  const response = await serverInstance.get(url);
  return response.data;
};
