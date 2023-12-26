import { serverInstance } from 'apis/axios';

export interface ContactAPIReq {
  title: string;
  type: string;
  content: string;
}

export interface ContactAPIRes {
  success: boolean;
  message: string | null;
}

export const contactAPI = async (
  data: ContactAPIReq,
): Promise<ContactAPIRes | undefined> => {
  const response = await serverInstance.post('/api/user/contact', data);
  return response.data;
};
