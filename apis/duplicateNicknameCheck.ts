import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface DuplicateNicknameCheckAPIReq {
  nickname: string;
}

export interface DuplicateNicknameCheckAPIRes {
  success: boolean;
  message: string | null;
}

export const duplicateNicknameCheckAPI = async <
  T extends DuplicateNicknameCheckAPIReq,
>(
  data: T,
): Promise<DuplicateNicknameCheckAPIRes | undefined> => {
  const nickname = data.nickname;

  const response = await apiClient.get(
    ENDPOINTS.GET.DUPLICATE_NICKNAME_CHECK(nickname),
    {
      params: { nickname },
    },
  );
  return response.data;
};
