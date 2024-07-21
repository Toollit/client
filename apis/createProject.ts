import { apiClient } from '@/apis/config/axios';

export interface CreateProjectData {
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

export const createProjectAPI = async (
  data: CreateProjectAPIReq,
): Promise<CreateProjectAPIRes | undefined> => {
  const response = await apiClient.post('/api/post/project/create', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
