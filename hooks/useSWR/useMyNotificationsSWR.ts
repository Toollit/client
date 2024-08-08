import React from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { errorMessage } from '@/apis/config/errorMessage';
import {
  Notification,
  ProfileNotificationsAPIRes,
  profileNotificationsFetcher,
} from '@/apis/fetcher/profileNotificationsFetcher';
import { serialize } from '@/middleware/swr/serialize';
import { useRouter } from 'next/router';

type SWR = (
  isValid: boolean,
  nickname: string,
  args: {
    page?: string;
    tag?: string;
  },
) => {
  notifications?: Notification[];
  isLoading: boolean;
  isError: any;
  notificationsMutate: KeyedMutator<ProfileNotificationsAPIRes | undefined>;
};

/**
 * @param {boolean} isValid - controlling data requests based on conditions
 * @param {string} nickname - unique value required for data requests
 * @param {Object} args - page and tag for identifying data
 */
const useMyNotificationsSWR: SWR = (isValid, nickname, args) => {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(
    isValid && nickname
      ? {
          url: `/api/user/profile/${nickname}?tab=viewNotifications`,
          args,
        }
      : null,
    profileNotificationsFetcher,
    {
      dedupingInterval: 1000 * 60 * 10,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError(err, key, config) {
        errorMessage(err);
        router.back();
      },
      use: [serialize],
    },
  );

  return {
    notifications: data?.data?.notifications,
    isError: error,
    isLoading,
    notificationsMutate: mutate,
  };
};

export default useMyNotificationsSWR;
