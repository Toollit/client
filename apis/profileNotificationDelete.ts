import { serverInstance } from './axios';

export interface ProfileNotificationDeleteAPIReq {
  notificationId: number;
}

export interface ProfileNotificationDeleteAPIRes {
  success: boolean;
  message: string | null;
}

export const profileNotificationDeleteAPI = async ({
  notificationId,
}: ProfileNotificationDeleteAPIReq): Promise<
  ProfileNotificationDeleteAPIRes | undefined
> => {
  const response = await serverInstance.post(
    '/api/user/profile/notification/delete',
    {
      notificationId,
    },
  );

  return response.data;
};
