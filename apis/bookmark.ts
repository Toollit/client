import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface BookmarkAPIReq {
  postId: string;
}

export interface BookmarkAPIRes {
  success: boolean;
  message: string | null;
  data: {
    status: 'save' | 'cancel';
  };
}

export const bookmarkAPI = async <T extends BookmarkAPIReq>(
  data: T,
): Promise<BookmarkAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.UPDATE.BOOKMARK_TOGGLE, data);
  return response.data;
};
