import { apiClient } from '@/apis/config/axios';

export interface UpdateSettingsNicknameAPIReq {
  nickname: string;
}

export interface UpdateSettingsNicknameAPIRes {
  success: boolean;
  message: string | null;
}

export const updateSettingsNicknameAPI = async (
  data: UpdateSettingsNicknameAPIReq,
): Promise<UpdateSettingsNicknameAPIRes | undefined> => {
  const response = await apiClient.post(
    '/api/user/signup/settings/update/nickname',
    data,
  );
  return response.data;
};
