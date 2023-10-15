import { serverInstance } from 'apis/axios';

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
  const response = await serverInstance.post(
    '/api/post/project/bookmark',
    data,
  );
  return response.data;
};
