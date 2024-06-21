import { serverInstance } from './axios';
import { FetcherParams } from './types';

export interface BookmarksStatusAPIReq {}

export interface BookmarksStatusAPIRes {
  success: boolean;
  message: string | null;
  data: {
    bookmarkIds: number[];
  };
}

export const bookmarksStatusFetcher = async ({
  url,
}: FetcherParams): Promise<BookmarksStatusAPIRes | undefined> => {
  const response = await serverInstance.get(url);
  return response.data;
};
