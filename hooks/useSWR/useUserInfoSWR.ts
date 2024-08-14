import React from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { serialize } from '@/middleware/swr/serialize';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/config/errorMessage';
import {
  ProfileInfoAPIRes,
  profileInfoFetcher,
} from '@/apis/fetcher/profileInfoFetcher';
import { ENDPOINTS } from '@/apis/endpoints';

type SWR = (
  isValid: boolean,
  nickname: string,
  args: {
    page?: string;
    tag?: string;
  },
) => {
  userInfo?: ProfileInfoAPIRes['data'];
  isLoading: boolean;
  isError: any;
  userInfoMutate: KeyedMutator<ProfileInfoAPIRes | undefined>;
};

/**
 * @param {boolean} isValid - controlling data requests based on conditions
 * @param {string} nickname - unique value required for data requests
 * @param {Object} args - page and tag for identifying data
 */
const useUserInfoSWR: SWR = (isValid, nickname, args) => {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(
    isValid && nickname
      ? {
          url: ENDPOINTS.GET.USER_INFO(nickname),
          args,
        }
      : null,
    profileInfoFetcher,
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
    userInfo: data?.data,
    isLoading,
    isError: error,
    userInfoMutate: mutate,
  };
};

export default useUserInfoSWR;
