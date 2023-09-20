import { serverInstance } from 'apis/axios';

export interface Project {
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

export const updateProjectAPI = async (
  data: UpdateProjectAPIReq,
): Promise<UpdateProjectAPIRes | undefined> => {
  const response = await serverInstance.post(`/api/post/project/update`, data);
  return response.data;
};
