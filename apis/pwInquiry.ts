import { serverInstance } from 'apis/axios';

export interface PwInquiryAPIReq {
  email: string;
}

export interface PwInquiryAPIRes {
  success: boolean;
  message: string | null;
}

export const pwInquiryAPI = async (
  data: PwInquiryAPIReq,
): Promise<PwInquiryAPIRes | undefined> => {
  const response = await serverInstance.post('/api/user/pwInquiry', data);
  return response.data;
};
