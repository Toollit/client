import { serverInstance } from 'apis/axios';

export interface ReportAPIReq {
  postId: number;
  postType: string;
  title: string;
  writer: string;
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
  const response = await serverInstance.post('/api/post/report', data);
  return response.data;
};
