import { apiClient } from '@/apis/config/axios';

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

export const bookmarkAPI = async (
  data: BookmarkAPIReq,
): Promise<BookmarkAPIRes | undefined> => {
  const response = await apiClient.post('/api/post/bookmark/toggle', data);
  return response.data;
};
