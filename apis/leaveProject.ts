import { apiClient } from '@/apis/config/axios';

export interface LeaveProjectAPIReq {
  postId: string;
}

export interface LeaveProjectAPIRes {
  success: boolean;
  message: string | null;
}

export const leaveProjectAPI = async (
  data: LeaveProjectAPIReq,
): Promise<LeaveProjectAPIRes | undefined> => {
  const response = await apiClient.post('/api/post/project/leave', data);
  return response.data;
};
