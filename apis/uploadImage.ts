import { serverInstance } from 'apis/axios';

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
  const response = await serverInstance.post(endpoint, data);
  return response.data;
};
