import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface CreateTemporaryPasswordAPIReq {
  email: string;
}

export interface CreateTemporaryPasswordAPIRes {
  success: boolean;
  message: string | null;
}

export const createTemporaryPasswordAPI = async <
  T extends CreateTemporaryPasswordAPIReq,
>(
  data: T,
): Promise<CreateTemporaryPasswordAPIRes | undefined> => {
  const response = await apiClient.post(
    ENDPOINTS.CREATE.TEMPORARY_PASSWORD,
    data,
  );
  return response.data;
};
