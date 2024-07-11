import { serverInstance } from 'apis/axios';
import { FetcherParams } from '@/typings/axios';

export interface Project {
  id: number;
  title: string;
  views: number;
  bookmarkCount: number;
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
  memberCount: number;
  recruitCount: number;
}

export interface ProfileBookmarksAPIReq {}

export interface ProfileBookmarksAPIRes {
  success: boolean;
  message: string | null;
  data?: {
    bookmarks: Project[];
    total: number;
  };
}

export const profileBookmarksFetcher = async ({
  url,
}: FetcherParams): Promise<ProfileBookmarksAPIRes | undefined> => {
  const response = await serverInstance.get(url);
  return response.data;
};
