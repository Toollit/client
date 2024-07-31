import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface ReportAPIReq {
  postId: number;
  postType: string;
  reason: string;
  url: string;
}

export interface ReportAPIRes {
  success: boolean;
  message: string | null;
}

export const reportAPI = async <T extends ReportAPIReq>(
  data: T,
): Promise<ReportAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.CREATE.REPORT, data);
  return response.data;
};
