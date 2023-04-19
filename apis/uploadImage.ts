import { serverInstance } from 'apis/axios';

export type UploadImageAPIReq = FormData;

export interface UploadImageAPIRes {
  success: boolean;
  message: string | null;
  data: { url: string };
}

export const uploadImageAPI = async (
  image: UploadImageAPIReq,
): Promise<UploadImageAPIRes | undefined> => {
  const response = await serverInstance.post(
    '/api/post/project/content/uploadImage',
    image,
  );
  return response.data;
};
