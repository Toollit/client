import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface ProjectJoinRejectAPIReq {
  notificationId: number;
}

export interface ProjectJoinRejectAPIRes {
  success: boolean;
  message: string | null;
}

export const projectJoinRejectAPI = async <T extends ProjectJoinRejectAPIReq>(
  data: T,
): Promise<ProjectJoinRejectAPIRes | undefined> => {
  const response = await apiClient.post(
    ENDPOINTS.CREATE.JOIN_REJECT_PROJECT_REQUEST,
    data,
  );
  return response.data;
};
