import { serverInstance } from 'apis/axios';

export interface UpdateSocialLoginNicknameAPIReq {
  nickname: string;
}

export interface UpdateSocialLoginNicknameAPIRes {
  success: boolean;
  message: string | null;
}

export const updateSocialLoginNicknameAPI = async (
  data: UpdateSocialLoginNicknameAPIReq,
): Promise<UpdateSocialLoginNicknameAPIRes | undefined> => {
  const response = await serverInstance.post(
    '/api/user/signUp/socialLogin/update/nickname',
    data,
  );
  return response.data;
};
