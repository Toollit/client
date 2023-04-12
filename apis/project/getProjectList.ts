import { serverInstance } from 'apis/axios';

export interface Project {
  id: number;
  title: string;
  views: number;
  bookmarks: number;
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
}
export interface GetProjectAPIRes {
  success: boolean;
  message: string | null;
  data: {
    projectList: Project[];
  };
}

export const getProjectListAPI = async (): Promise<
  GetProjectAPIRes | undefined
> => {
  const response = await serverInstance.get('post/project');
  return response.data;
};
