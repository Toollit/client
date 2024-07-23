import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface NicknameInitializeAPIReq {
  nickname: string;
}

export interface NicknameInitializeAPIRes {
  success: boolean;
  message: string | null;
}

export const nicknameInitializeAPI = async <T extends NicknameInitializeAPIReq>(
  data: T,
): Promise<NicknameInitializeAPIRes | undefined> => {
  const response = await apiClient.post(
    ENDPOINTS.UPDATE.NICKNAME_INITIALIZE,
    data,
  );
  return response.data;
};
