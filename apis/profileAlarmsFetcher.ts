import { serverInstance } from 'apis/axios';
import { FetcherParams } from './types';

export interface Project {
  id: number;
  title: string;
  createdAt: string;
}

export interface User {
  nickname: string;
}

export interface Alarm {
  project: Project;
  requestUser: User;
}

export interface ProfileAlarmsAPIReq {}

export interface ProfileAlarmsAPIRes {
  success: boolean;
  message: string | null;
  data?: {
    alarms: Alarm[] | [];
  };
}

export const profileAlarmsFetcher = async ({
  url,
}: FetcherParams): Promise<ProfileAlarmsAPIRes | undefined> => {
  const response = await serverInstance.get(url);
  return response.data;
};
