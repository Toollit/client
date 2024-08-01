import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface UpdateBookmarkAPIReq {
  postId: string;
}

export interface UpdateBookmarkAPIRes {
  success: boolean;
  message: string | null;
  data: {
    status: 'save' | 'cancel';
  };
}

export const updateBookmarkAPI = async <T extends UpdateBookmarkAPIReq>(
  data: T,
): Promise<UpdateBookmarkAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.UPDATE.BOOKMARK_TOGGLE, data);
  return response.data;
};
