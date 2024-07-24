import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface EmailAuthCodeAPIReq {
  email: string;
}

export interface EmailAuthCodeAPIRes {
  success: boolean;
  message: string | null;
}

export const emailAuthCodeAPI = async <T extends EmailAuthCodeAPIReq>(
  data: T,
): Promise<EmailAuthCodeAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.CREATE.EMAIL_AUTH_CODE, data);
  return response.data;
};
