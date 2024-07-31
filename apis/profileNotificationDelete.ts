import { apiClient } from '@/apis/config/axios';
import { ENDPOINTS } from './endpoints';

export interface ProfileNotificationDeleteAPIReq {
  notificationId: number;
}

export interface ProfileNotificationDeleteAPIRes {
  success: boolean;
  message: string | null;
}

export const profileNotificationDeleteAPI = async <
  T extends ProfileNotificationDeleteAPIReq,
>(
  data: T,
): Promise<ProfileNotificationDeleteAPIRes | undefined> => {
  const response = await apiClient.post(ENDPOINTS.DELETE.NOTIFICATION, {
    notificationId: data.notificationId,
  });

  return response.data;
};
