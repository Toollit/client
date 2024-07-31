import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface LeaveProjectAPIReq {
  postId: string;
}

export interface LeaveProjectAPIRes {
  success: boolean;
  message: string | null;
}

export const leaveProjectAPI = async <T extends LeaveProjectAPIReq>(
  data: T,
): Promise<LeaveProjectAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.UPDATE.LEAVE_PROJECT, data);
  return response.data;
};
