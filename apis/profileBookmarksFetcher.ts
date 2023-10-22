import { serverInstance } from 'apis/axios';
import { FetcherParams } from './types';

export interface Project {
  id: number;
  title: string;
  views: number;
  bookmarks: number;
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
  memberNumber: number;
  recruitNumber: number;
}

export interface ProfileBookmarksAPIReq {}

export interface ProfileBookmarksAPIRes {
  success: boolean;
  message: string | null;
  data?: {
    bookmarks: Project[] | [];
    total: number;
  };
}

export const profileBookmarksFetcher = async ({
  url,
}: FetcherParams): Promise<ProfileBookmarksAPIRes | undefined> => {
  const response = await serverInstance.get(url);
  return response.data;
};
