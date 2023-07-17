import { serverInstance } from 'apis/axios';

export interface UpdateProfileAPIReq {
  category: string;
  data: string | FormData;
  option?: {
    [key: string]: {
      [key: string]: string;
    };
  };
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
  const requestData = data.data instanceof FormData ? data.data : data;

  if (data.option) {
    const response = await serverInstance.post(
      `/api/user/profile/${data.category}`,
      requestData,
      { ...data.option },
    );

    return response.data;
  } else {
    const response = await serverInstance.post(
      `/api/user/profile/${data.category}`,
      requestData,
    );

    return response.data;
  }
};
