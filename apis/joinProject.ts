import { serverInstance } from 'apis/axios';

export interface JoinProjectAPIReq {
  postId: string;
}

export interface JoinProjectAPIRes {
  success: boolean;
  message: string | null;
}

export const joinProjectAPI = async (
  data: JoinProjectAPIReq,
): Promise<JoinProjectAPIRes | undefined> => {
  const response = await serverInstance.post('/api/post/project/join', data);
  return response.data;
};
