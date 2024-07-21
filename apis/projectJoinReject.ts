import { apiClient } from '@/apis/config/axios';

export interface ProjectJoinRejectAPIReq {
  notificationId: number;
}

export interface ProjectJoinRejectAPIRes {
  success: boolean;
  message: string | null;
}

export const projectJoinRejectAPI = async (
  data: ProjectJoinRejectAPIReq,
): Promise<ProjectJoinRejectAPIRes | undefined> => {
  const response = await apiClient.post('/api/post/project/join/reject', data);
  return response.data;
};
