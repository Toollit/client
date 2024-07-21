import { apiClient } from '@/apis/config/axios';

export interface ProjectJoinApproveAPIReq {
  notificationId: number;
}

export interface ProjectJoinApproveAPIRes {
  success: boolean;
  message: string | null;
}

export const projectJoinApproveAPI = async (
  data: ProjectJoinApproveAPIReq,
): Promise<ProjectJoinApproveAPIRes | undefined> => {
  const response = await apiClient.post('/api/post/project/join/approve', data);
  return response.data;
};
