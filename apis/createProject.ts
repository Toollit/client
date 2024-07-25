import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface ProjectRequiredData {
  title: string;
  contentHTML: string;
  contentMarkdown: string;
  imageUrls: string[];
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
  recruitCount: number;
}

export type CreateProjectAPIReq = FormData;

export interface CreateProjectAPIRes {
  success: boolean;
  message: string | null;
  data: {
    postId: number;
  };
}

export const createProjectAPI = async <T extends CreateProjectAPIReq>(
  data: T,
): Promise<CreateProjectAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.CREATE.PROJECT, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
