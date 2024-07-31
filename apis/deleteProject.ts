import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface DeleteProjectAPIReq {
  postId: string;
}

export interface DeleteProjectAPIRes {
  success: boolean;
  message: string | null;
}

export const deleteProjectAPI = async <T extends DeleteProjectAPIReq>(
  data: T,
): Promise<DeleteProjectAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.DELETE.PROJECT, data);
  return response.data;
};
