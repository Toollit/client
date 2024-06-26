import { serverInstance } from 'apis/axios';

export interface DeleteAccountConfirmAPIReq {
  email: string;
  a1: string;
  a2: string;
  a3: string;
}

export interface DeleteAccountConfirmAPIRes {
  success: boolean;
  message: string | null;
}

export const deleteAccountConfirmAPI = async (
  data: DeleteAccountConfirmAPIReq,
): Promise<DeleteAccountConfirmAPIRes | undefined> => {
  const response = await serverInstance.post(
    '/api/user/deleteAccount/confirm',
    data,
  );
  return response.data;
};
