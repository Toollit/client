import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface PwInquiryAPIReq {
  email: string;
}

export interface PwInquiryAPIRes {
  success: boolean;
  message: string | null;
}

export const pwInquiryAPI = async <T extends PwInquiryAPIReq>(
  data: T,
): Promise<PwInquiryAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.CREATE.PW_INQUIRY, data);
  return response.data;
};
