import React from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { serialize } from '@/middleware/swr/serialize';
import {
  ProfileImage,
  ProfileImageAPIRes,
  profileImageFetcher,
} from '@/apis/fetcher/profileImageFetcher';
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
  profileImage?: ProfileImage['profileImage'];
  isLoading: boolean;
  isError: any;
  profileImageMutate: KeyedMutator<ProfileImageAPIRes | undefined>;
};

const useUserImageSWR: SWR = (isValid, nickname, args) => {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(
    isValid && nickname
      ? {
          url: `/api/user/profile/${nickname}/profileImage`,
          args,
        }
      : null,
    profileImageFetcher,
    {
      dedupingInterval: 1000 * 60 * 10,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError(err, key, config) {
        router.replace('/');
        errorMessage(err);
      },
      use: [serialize],
    },
  );

  return {
    profileImage: data?.data?.profileImage,
    isLoading,
    isError: error,
    profileImageMutate: mutate,
  };
};

export default useUserImageSWR;
