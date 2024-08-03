import React from 'react';
import useSWR from 'swr';
import { serialize } from '@/middleware/swr/serialize';
import { userRegisteredCheckFetcher } from '@/apis/fetcher/userRegisteredCheckFetcher';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/config/errorMessage';

type SWR = (
  isValid: boolean,
  nickname: string,
  args: {
    page?: string;
    tag?: string;
  },
) => {
  isRegisteredUser: boolean;
  isLoading: boolean;
  isError: any;
};

const useUserRegisteredCheckSWR: SWR = (isValid, nickname, args) => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    isValid && nickname
      ? {
          url: `/api/user/profile/${nickname}/registeredCheck`,
          args,
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
