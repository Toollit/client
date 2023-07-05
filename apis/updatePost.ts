import { serverInstance } from 'apis/axios';

interface Project {
  title: string;
  contentHTML: string;
  contentMarkdown: string;
  imageUrls: string[];
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
  recruitNumber: number;
}
export interface UpdateProjectAPIReq {
  postType: 'project' | 'free' | 'question';
  postId: string;
  data: Project;
}

export interface UpdateProjectAPIRes {
  success: boolean;
  message: string | null;
  data: {
    postId: number;
  };
}

export const updatePostAPI = async (
  data: UpdateProjectAPIReq,
): Promise<UpdateProjectAPIRes | undefined> => {
  const response = await serverInstance.post(`/api/post/modify`, data);
  return response.data;
};
