import { serverInstance } from 'apis/axios';
import { FetcherParams } from './types';

export interface Notification {
  type:
    | 'projectJoinRequest'
    | 'approveProjectJoinRequest'
    | 'rejectProjectJoinRequest';
  id: number;
  projectId: number;
  projectTitle: string;
  createdAt: string;
  joinRequestUserNickname: string;
}

export interface ProfileNotificationsAPIReq {}

export interface ProfileNotificationsAPIRes {
  success: boolean;
  message: string | null;
  data?: {
    notifications: Notification[] | [];
  };
}

export const profileNotificationsFetcher = async ({
  url,
}: FetcherParams): Promise<ProfileNotificationsAPIRes | undefined> => {
  const response = await serverInstance.get(url);
  return response.data;
};
