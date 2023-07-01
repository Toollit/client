import { serverInstance } from 'apis/axios';

export interface UpdateProfileAPIReq {
  category: string;
  data: string;
}

export interface UpdateProfileAPIRes {
  success: boolean;
  message: string | null;
  data: {
    [category: string]: string;
  };
}

export const updateProfileAPI = async (
  data: UpdateProfileAPIReq,
): Promise<UpdateProfileAPIRes | undefined> => {
  const response = await serverInstance.post(
    `/api/user/profile/${data.category}`,
    data,
  );
  return response.data;
};
