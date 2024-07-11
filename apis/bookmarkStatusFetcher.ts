import { serverInstance } from './axios';
import { FetcherParams } from '@/typings/axios';

export interface BookmarkStatusAPIReq {}

export interface BookmarkStatusAPIRes {
  success: boolean;
  message: string | null;
  data: {
    bookmark: boolean;
  };
}

export const bookmarkStatusFetcher = async ({
  url,
}: FetcherParams): Promise<BookmarkStatusAPIRes | undefined> => {
  const response = await serverInstance.get(url);
  return response.data;
};
