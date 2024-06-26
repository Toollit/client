import React from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { serialize } from '@/middleware/swr/serialize';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';
import {
  ProfileInfoAPIRes,
  profileInfoFetcher,
} from '@/apis/profileInfoFetcher';

type SWR = (
  nickname: string,
  page?: string,
  tag?: string,
) => {
  userInfo: ProfileInfoAPIRes['data'];
  isLoading: boolean;
  isError: any;
  userInfoMutate: KeyedMutator<ProfileInfoAPIRes | undefined>;
};

const useUserInfoSWR: SWR = (nickname, page, tag) => {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(
    nickname
      ? {
          url: `/api/user/profile/${nickname}?tab=viewProfile`,
          args: { page, tag },
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
