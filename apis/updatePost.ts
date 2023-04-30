import { serverInstance } from 'apis/axios';

interface Project {
  title: string;
  contentHTML: string;
  contentMarkdown: string;
  imageUrls: string[];
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
}
export interface CreateProjectAPIReq {
  postType: 'project' | 'free' | 'question';
  postId: string;
  data: Project;
}

export interface CreateProjectAPIRes {
  success: boolean;
  message: string | null;
  data: {
    postId: number;
  };
}

export const updatePostAPI = async (
  data: CreateProjectAPIReq,
): Promise<CreateProjectAPIRes | undefined> => {
  const response = await serverInstance.post(`/api/post/modify`, data);
  return response.data;
};
