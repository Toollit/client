import { apiClient } from '@/apis/config/axios';

export interface EmailIssueAuthCodeAPIReq {
  email: string;
}

export interface EmailIssueAuthCodeAPIRes {
  success: boolean;
  message: string | null;
}

export const emailIssueAuthCodeAPI = async (
  data: EmailIssueAuthCodeAPIReq,
): Promise<EmailIssueAuthCodeAPIRes | undefined> => {
  const response = await apiClient.post('/api/auth/email/issueAuthCode', data);
  return response.data;
};
