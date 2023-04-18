import { serverInstance } from 'apis/axios';

interface EmailAuthAPIReq {
  email: string;
}

export interface EmailAuthAPIRes {
  success: boolean;
  message: string;
  data: {
    authNums: string;
  };
}

export const emailAuthAPI = async (
  data: EmailAuthAPIReq,
): Promise<EmailAuthAPIRes | undefined> => {
  const response = await serverInstance.post('/api/auth/email', data);
  return response.data;
};
