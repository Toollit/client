import { apiClient } from '@/apis/config/axios';
import { FetcherParams } from '@/typings/axios';

export interface ProjectWriter {
  nickname: string;
  lastSigninAt: string;
  profileImage: string | null;
}

export interface ProjectWriterAPIReq {}

export interface ProjectWriterAPIRes {
  success: boolean;
  message: string | null;
  data: ProjectWriter;
}

export const projectWriterFetcher = async ({
  url,
}: FetcherParams): Promise<ProjectWriterAPIRes | undefined> => {
  const response = await apiClient.get(url);
  return response.data;
};
