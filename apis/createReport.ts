import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface CreateReportAPIReq {
  postId: number;
  postType: string;
  reason: string;
  url: string;
}

export interface CreateReportAPIRes {
  success: boolean;
  message: string | null;
}

export const createReportAPI = async <T extends CreateReportAPIReq>(
  data: T,
): Promise<CreateReportAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.CREATE.REPORT, data);
  return response.data;
};
