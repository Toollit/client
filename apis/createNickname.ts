import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface CreateNicknameAPIReq {
  nickname: string;
}

export interface CreateNicknameAPIRes {
  success: boolean;
  message: string | null;
}

export const createNicknameAPI = async <T extends CreateNicknameAPIReq>(
  data: T,
): Promise<CreateNicknameAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.CREATE.NICKNAME, data);
  return response.data;
};
