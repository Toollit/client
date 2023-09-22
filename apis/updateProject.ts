import { serverInstance } from 'apis/axios';

export interface ProjectData {
  projectId: string;
  title: string;
  contentHTML: string;
  contentMarkdown: string;
  imageUrls: string[];
  hashtags: string[];
  memberTypes: ('developer' | 'designer' | 'pm' | 'anyone')[];
  recruitNumber: number;
}
export type UpdateProjectAPIReq = FormData;

export interface UpdateProjectAPIRes {
  success: boolean;
  message: string | null;
  data: {
    projectId: number;
  };
}

export const updateProjectAPI = async (
  data: UpdateProjectAPIReq,
): Promise<UpdateProjectAPIRes | undefined> => {
  const response = await serverInstance.post(`/api/post/project/update`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
