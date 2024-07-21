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

export interface ProfileNotificationsAPIReq {}

export interface ProfileNotificationsAPIRes {
  success: boolean;
  message: string | null;
  data: {
    notifications: Notification[];
    total: number;
  };
}

export const profileNotificationsFetcher = async ({
  url,
}: FetcherParams): Promise<ProfileNotificationsAPIRes | undefined> => {
  const response = await apiClient.get(url);
  return response.data;
};
