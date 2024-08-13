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
import { ENDPOINTS } from '@/apis/endpoints';

type SWR = (
  isValid: boolean,
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
 * @param {Object} args - page and tag for identifying data
 */
const useMyNotificationsSWR: SWR = (isValid, args) => {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(
    isValid
      ? {
          url: ENDPOINTS.GET.MY_NOTIFICATIONS,
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
