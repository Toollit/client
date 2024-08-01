import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface CreateEmailAuthCodeAPIReq {
  email: string;
}

export interface CreateEmailAuthCodeAPIRes {
  success: boolean;
  message: string | null;
}

export const createEmailAuthCodeAPI = async <
  T extends CreateEmailAuthCodeAPIReq,
>(
  data: T,
): Promise<CreateEmailAuthCodeAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.CREATE.EMAIL_AUTH_CODE, data);
  return response.data;
};
