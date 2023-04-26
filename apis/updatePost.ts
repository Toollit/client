import { serverInstance } from 'apis/axios';

export interface CreateProjectAPIReq {
  postId: string;
  title: string;
  contentHTML: string;
  contentMarkdown: string;
  imageUrls: string[];
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
}

export interface CreateProjectAPIRes {
  success: boolean;
  message: string | null;
  data: {
    postId: number;
  };
}

export const updatePostAPI = async (
  postType: 'project' | 'free' | 'question',
  data: CreateProjectAPIReq,
): Promise<CreateProjectAPIRes | undefined> => {
  const response = await serverInstance.post(
    `/api/post/${postType}/modify`,
    data,
  );
  return response.data;
};
