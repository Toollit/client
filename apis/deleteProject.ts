import { apiClient } from '@/apis/config/axios';

export interface DeleteProjectAPIReq {
  postId: string;
}

export interface DeleteProjectAPIRes {
  success: boolean;
  message: string | null;
}

export const deleteProjectAPI = async (
  data: DeleteProjectAPIReq,
): Promise<DeleteProjectAPIRes | undefined> => {
  const response = await apiClient.post(`/api/post/project/delete`, data);
  return response.data;
};
