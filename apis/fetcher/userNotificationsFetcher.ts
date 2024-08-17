import { apiClient } from '@/apis/config/axios';
import { FetcherParams } from '@/typings/axios';

export interface Notification {
  type:
    | 'projectJoinRequest'
    | 'projectJoinApprove'
    | 'projectJoinReject'
    | 'projectLeave';
  id: number;
  projectId: number;
  projectTitle: string;
  createdAt: string;
  notificationCreator: string;
}

export interface UserNotificationsAPIReq {}

export interface UserNotificationsAPIRes {
  success: boolean;
  message: string | null;
  data: {
    notifications: Notification[];
    total: number;
  };
}

export const userNotificationsFetcher = async ({
  url,
}: FetcherParams): Promise<UserNotificationsAPIRes | undefined> => {
  const response = await apiClient.get(url);
  return response.data;
};
