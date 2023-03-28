import { serverInstance } from 'apis/axios';

export interface AddProjectAPIReq {
  title: string;
  contentHtml: string;
  contentMark: string;
}

export interface AddProjectAPIRes {
  success: boolean;
  message: string | null;
}

export const addProjectAPI = async (
  data: AddProjectAPIReq,
): Promise<AddProjectAPIRes | undefined> => {
  const response = await serverInstance.post('post/project/create', data);
  return response.data;
};
