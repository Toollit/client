import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface JoinProjectRequestAPIReq {
  postId: string;
}

export interface JoinProjectRequestAPIRes {
  success: boolean;
  message: string | null;
}

export const joinProjectRequestAPI = async <T extends JoinProjectRequestAPIReq>(
  data: T,
): Promise<JoinProjectRequestAPIRes | undefined> => {
  const response = await apiClient.post(
    ENDPOINTS.CREATE.JOIN_PROJECT_REQUEST,
    data,
  );
  return response.data;
};
