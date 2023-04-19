import { serverInstance } from 'apis/axios';

export interface ResetPasswordAPIReq {
  password: string;
}

export interface ResetPasswordAPIRes {
  success: boolean;
  message: string | null;
}

export const resetPasswordAPI = async (
  data: ResetPasswordAPIReq,
): Promise<ResetPasswordAPIRes | undefined> => {
  const response = await serverInstance.post('/api/user/resetpassword', data);
  return response.data;
};
