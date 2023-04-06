import { serverInstance } from 'apis/axios';

export interface GetProjectAPIRes {
  success: boolean;
  message: string | null;
  data: {
    projectList: {
      id: number;
      title: string;
      views: number;
      likes: number;
    }[];
  };
}

export const getProjectListAPI = async (): Promise<
  GetProjectAPIRes | undefined
> => {
  const response = await serverInstance.get('post/project');
  return response.data;
};
