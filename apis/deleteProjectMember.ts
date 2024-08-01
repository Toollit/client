import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface DeleteProjectMemberAPIReq {
  postId: string;
}

export interface DeleteProjectMemberAPIRes {
  success: boolean;
  message: string | null;
}

export const deleteProjectMemberAPI = async <
  T extends DeleteProjectMemberAPIReq,
>(
  data: T,
): Promise<DeleteProjectMemberAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.DELETE.PROJECT_MEMBER, data);
  return response.data;
};
