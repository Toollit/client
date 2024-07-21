import { apiClient } from '@/apis/config/axios';

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
  const response = await apiClient.post('/api/user/pwInquiry', data);
  return response.data;
};
