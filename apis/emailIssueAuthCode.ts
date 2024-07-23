import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface EmailIssueAuthCodeAPIReq {
  email: string;
}

export interface EmailIssueAuthCodeAPIRes {
  success: boolean;
  message: string | null;
}

export const emailIssueAuthCodeAPI = async <T extends EmailIssueAuthCodeAPIReq>(
  data: T,
): Promise<EmailIssueAuthCodeAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.CREATE.ISSUE_AUTH_CODE, data);
  return response.data;
};
