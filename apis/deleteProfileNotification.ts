import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface DeleteProfileNotificationAPIReq {
  notificationId: number;
}

export interface DeleteProfileNotificationAPIRes {
  success: boolean;
  message: string | null;
}

export const deleteProfileNotificationAPI = async <
  T extends DeleteProfileNotificationAPIReq,
>(
  data: T,
): Promise<DeleteProfileNotificationAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.DELETE.NOTIFICATION, {
    notificationId: data.notificationId,
  });

  return response.data;
};
