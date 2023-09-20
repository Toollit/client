import { serverInstance } from 'apis/axios';

export interface DeleteProjectAPIReq {
  postType: 'project' | 'free' | 'question';
  postId: string;
}

export interface DeleteProjectAPIRes {
  success: boolean;
  message: string | null;
}

export const deleteProjectAPI = async (
  data: DeleteProjectAPIReq,
): Promise<DeleteProjectAPIRes | undefined> => {
  const response = await serverInstance.post(`/api/post/project/delete`, data);
  return response.data;
};
