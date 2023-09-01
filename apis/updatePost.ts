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
export interface UpdatePostAPIReq {
  postType: 'project' | 'free' | 'question';
  postId: string;
  data: Project;
}

export interface UpdatePostAPIRes {
  success: boolean;
  message: string | null;
  data: {
    postId: number;
  };
}

export const updatePostAPI = async (
  data: UpdatePostAPIReq,
): Promise<UpdatePostAPIRes | undefined> => {
  const response = await serverInstance.post(`/api/post/modify`, data);
  return response.data;
};
