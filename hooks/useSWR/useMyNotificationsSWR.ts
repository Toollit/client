import { errorMessage } from '@/apis/errorMessage';
import {
  Notification,
  ProfileNotificationsAPIRes,
  profileNotificationsFetcher,
} from '@/apis/profileNotificationsFetcher';
import { serialize } from '@/middleware/swr/serialize';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR, { KeyedMutator } from 'swr';

type SWR = (
  isValid: boolean,
  nickname: string,
  page?: string,
  tag?: string,
) => {
  notifications?: Notification[];
  isLoading: boolean;
  isError: any;
  notificationsMutate: KeyedMutator<ProfileNotificationsAPIRes | undefined>;
};

const useMyNotificationsSWR: SWR = (isValid, nickname, page, tag) => {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(
    isValid && nickname
      ? {
          url: `/api/user/profile/${nickname}?tab=viewNotifications`,
          args: {
            page,
            tag,
          },
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
