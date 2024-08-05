import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface DeleteAccountConfirmAPIReq {
  email: string;
  authCode1: string;
  authCode2: string;
  authCode3: string;
}

export interface DeleteAccountConfirmAPIRes {
  success: boolean;
  message: string | null;
}

export const deleteAccountConfirmAPI = async <
  T extends DeleteAccountConfirmAPIReq,
>(
  data: T,
): Promise<DeleteAccountConfirmAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.DELETE.ACCOUNT_CONFIRM, data);
  return response.data;
};
