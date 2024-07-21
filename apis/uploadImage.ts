import { apiClient } from '@/apis/config/axios';

export type UploadImageAPIReq = FormData;

export interface UploadImageAPIRes {
  success: boolean;
  message: string | null;
  data: { url: string };
}

export const uploadImageAPI = async (
  endpoint: string,
  data: UploadImageAPIReq,
): Promise<UploadImageAPIRes | undefined> => {
  const response = await apiClient.post(endpoint, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
