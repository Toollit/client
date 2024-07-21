import { apiClient } from '@/apis/config/axios';

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

export const reportAPI = async (
  data: ReportAPIReq,
): Promise<ReportAPIRes | undefined> => {
  const response = await apiClient.post('/api/post/report', data);
  return response.data;
};
