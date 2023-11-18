import { serverInstance } from 'apis/axios';

export interface ProjectJoinRejectAPIReq {
  notificationId: number;
}

export interface ProjectJoinRejectAPIRes {
  success: boolean;
  message: string | null;
}

export const projectJoinRejectAPI = async (
  data: ProjectJoinRejectAPIReq,
): Promise<ProjectJoinRejectAPIRes | undefined> => {
  const response = await serverInstance.post(
    '/api/post/project/join/reject',
    data,
  );
  return response.data;
};
