import { serverInstance } from 'apis/axios';

export interface UpdateProfileAPIReq {
  editCategory: string;
  data: string;
}

export interface UpdateProfileAPIRes {
  success: boolean;
  message: string | null;
  data: {
    [editCategory: string]: string;
  };
}

export const updateProfileAPI = async (
  data: UpdateProfileAPIReq,
): Promise<UpdateProfileAPIRes | undefined> => {
  const response = await serverInstance.post(
    `/api/user/profile/${data.editCategory}`,
    data,
  );
  return response.data;
};
