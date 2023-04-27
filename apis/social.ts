import { serverInstance } from 'apis/axios';

export interface SocialLoginAPIReq {
  loginType: 'google' | 'github';
}

export interface SocialLoginAPIRes {
  success: boolean;
  message: string | null;
}

export const socialLoginAPI = async (
  data: SocialLoginAPIReq,
): Promise<SocialLoginAPIRes | undefined> => {
  const response = await serverInstance.get(`user/login/${data.loginType}`);
  return response.data;
};
