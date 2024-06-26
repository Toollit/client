import { serverInstance } from './axios';

export interface DuplicateCheckNicknameAPIReq {
  nickname: string;
}

export interface DuplicateCheckNicknameAPIRes {
  success: boolean;
  message: string | null;
}

export const DuplicateCheckNicknameAPI = async ({
  nickname,
}: DuplicateCheckNicknameAPIReq): Promise<
  DuplicateCheckNicknameAPIRes | undefined
> => {
  const response = await serverInstance.post(
    '/api/user/duplicateCheckNickname',
    {
      nickname,
    },
  );
  return response.data;
};
