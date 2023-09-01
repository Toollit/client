import { serverInstance } from 'apis/axios';

export interface EmailAuthAPIReq {
  email: string;
}

export interface EmailAuthAPIRes {
  success: boolean;
  message: string | null;
}

export const emailAuthAPI = async (
  data: EmailAuthAPIReq,
): Promise<EmailAuthAPIRes | undefined> => {
  const response = await serverInstance.post('/api/auth/email', data);
  return response.data;
};
