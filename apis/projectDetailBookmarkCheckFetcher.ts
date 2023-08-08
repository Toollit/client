import { serverInstance } from './axios';

export interface CheckBookmarkAPIRes {
  success: boolean;
  message: string | null;
  data: {
    bookmark: boolean;
  };
}

export const projectDetailBookmarkCheckFetcher = async (url: string) => {
  const response = await serverInstance.get<CheckBookmarkAPIRes>(url);
  return response.data;
};
