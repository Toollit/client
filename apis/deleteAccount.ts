import { serverInstance } from 'apis/axios';

export interface DeleteAccountAPIReq {}

export interface DeleteAccountAPIRes {
  success: boolean;
  message: string | null;
}

export const deleteAccountAPI = async (
  data: DeleteAccountAPIReq,
): Promise<DeleteAccountAPIRes | undefined> => {
  const response = await serverInstance.post('/api/user/deleteAccount', data);
  return response.data;
};
