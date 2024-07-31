import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface UpdateProjectData {
  postId: string;
  title: string;
  contentHTML: string;
  contentMarkdown: string;
  imageUrls: string[];
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
  recruitCount: number;
}
export type UpdateProjectAPIReq = FormData;

export interface UpdateProjectAPIRes {
  success: boolean;
  message: string | null;
  data: {
    postId: string;
  };
}

export const updateProjectAPI = async <T extends UpdateProjectAPIReq>(
  data: T,
): Promise<UpdateProjectAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.UPDATE.PROJECT, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
