import { serverInstance } from 'apis/axios';

export interface GetProjectDetailAPIReq {
  projectId: string;
}

export interface GetProjectDetailAPIResData {
  user: { nickname: string; lastLoginAt: string; profileImage: string };
  title: string;
  contentHTML: string;
  contentMarkdown: string | null;
  views: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetProjectDetailAPIRes {
  success: boolean;
  message: string | null;
  data: GetProjectDetailAPIResData;
}

export const getProjectDetailAPI = async (
  data: GetProjectDetailAPIReq,
): Promise<GetProjectDetailAPIRes | undefined> => {
  const response = await serverInstance.get(`post/project/${data.projectId}`);
  return response.data;
};
