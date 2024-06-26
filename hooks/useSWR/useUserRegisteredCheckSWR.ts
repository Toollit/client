import React from 'react';
import useSWR from 'swr';
import { serialize } from '@/middleware/swr/serialize';
import { userRegisteredCheckFetcher } from '@/apis/userRegisteredCheckFetcher';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';

type SWR = (
  nickname: string,
  page?: string,
  tag?: string,
) => {
  isRegisteredUser: boolean;
  isLoading: boolean;
  isError: any;
};

const useUserRegisteredCheckSWR: SWR = (nickname, page, tag) => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    nickname
      ? {
          url: `/api/user/profile/${nickname}/registeredCheck`,
          args: { page, tag },
        }
      : null,
    userRegisteredCheckFetcher,
    {
      onError(err, key, config) {
        router.replace('/');
        errorMessage(err);
      },
      dedupingInterval: 1000 * 60 * 10,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      use: [serialize],
    },
  );

  return {
    isRegisteredUser: data ? data?.data?.registeredUser : false,
    isLoading,
    isError: error,
  };
};

export default useUserRegisteredCheckSWR;
