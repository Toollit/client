import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

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

export const updateProfileAPI = async <T extends UpdateProfileAPIReq>(
  data: T,
): Promise<UpdateProfileAPIRes | undefined> => {
  const requestData = data.data instanceof FormData ? data.data : data;

  if (data.option) {
    const response = await apiClient.post(
      ENDPOINTS.UPDATE.PROFILE(data.category),
      requestData,
      { ...data.option },
    );

    return response.data;
  } else {
    const response = await apiClient.post(
      ENDPOINTS.UPDATE.PROFILE(data.category),
      requestData,
    );

    return response.data;
  }
};
