import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface ProjectJoinApproveAPIReq {
  notificationId: number;
}

export interface ProjectJoinApproveAPIRes {
  success: boolean;
  message: string | null;
}

export const projectJoinApproveAPI = async <T extends ProjectJoinApproveAPIReq>(
  data: T,
): Promise<ProjectJoinApproveAPIRes | undefined> => {
  const response = await apiClient.post(
    ENDPOINTS.UPDATE.JOIN_APPROVE_PROJECT,
    data,
  );
  return response.data;
};
