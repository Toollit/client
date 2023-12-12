import { serverInstance } from 'apis/axios';

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
  const response = await serverInstance.post(
    '/api/user/signUp/settings/update/nickname',
    data,
  );
  return response.data;
};
