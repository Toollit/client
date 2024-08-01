import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface UpdateProjectJoinRequestAPIReq {
  notificationId: number;
  approvalStatus: 'approve' | 'reject';
}

export interface UpdateProjectJoinRequestAPIRes {
  success: boolean;
  message: string | null;
}

export const updateProjectJoinRequestAPI = async <
  T extends UpdateProjectJoinRequestAPIReq,
>(
  data: T,
): Promise<UpdateProjectJoinRequestAPIRes | undefined> => {
  const response = await apiClient.post(
    ENDPOINTS.UPDATE.PROJECT_JOIN_REQUEST(data.approvalStatus),
    data,
  );
  return response.data;
};
