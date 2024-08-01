import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface CreateProjectJoinRequestAPIReq {
  postId: string;
}

export interface CreateProjectJoinRequestAPIRes {
  success: boolean;
  message: string | null;
}

export const createProjectJoinRequestAPI = async <
  T extends CreateProjectJoinRequestAPIReq,
>(
  data: T,
): Promise<CreateProjectJoinRequestAPIRes | undefined> => {
  const response = await apiClient.post(
    ENDPOINTS.CREATE.PROJECT_JOIN_REQUEST,
    data,
  );
  return response.data;
};
