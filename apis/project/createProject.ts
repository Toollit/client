import { serverInstance } from 'apis/axios';

export interface CreateProjectAPIReq {
  title: string;
  contentHTML: string;
  contentMarkdown: string;
  imageUrls: {
    saveImgUrls: string[];
    removeImgUrls: string[];
  };
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
}

export interface CreateProjectAPIRes {
  success: boolean;
  message: string | null;
  data: {
    projectId: number;
  };
}

export const createProjectAPI = async (
  data: CreateProjectAPIReq,
): Promise<CreateProjectAPIRes | undefined> => {
  const response = await serverInstance.post('post/project/create', data);
  return response.data;
};