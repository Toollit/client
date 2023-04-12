import { serverInstance } from 'apis/axios';

export interface GetProjectDetailAPIReq {
  projectId: string;
}

export interface GetProjectDetailAPIResData {
  writer: { nickname: string; lastLoginAt: string; profileImage: string };
  content: {
    title: string;
    contentHTML: string;
    contentMarkdown: string | null;
    views: number;
    createdAt: string;
    updatedAt: string | null;
    hashtags: string[];
    memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
  };
  // comments: {}[];
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
