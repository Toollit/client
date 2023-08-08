import { serverInstance } from 'apis/axios';

export interface BookmarkAPIReq {
  postId: number;
}

export interface BookmarkAPIRes {
  success: boolean;
  message: 'save' | 'cancel' | null;
}

export const bookmarkAPI = async (
  data: BookmarkAPIReq,
): Promise<BookmarkAPIRes | undefined> => {
  const response = await serverInstance.post(
    '/api/post/project/bookmark',
    data,
  );
  return response.data;
};
