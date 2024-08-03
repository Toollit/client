import React from 'react';
import useSWR from 'swr';
import { serialize } from '@/middleware/swr/serialize';
import { errorMessage } from '@/apis/config/errorMessage';
import { bookmarksFetcher } from '@/apis/fetcher/bookmarksFetcher';
import { useRouter } from 'next/router';
import { ProjectOverview } from '@/typings';

type SWR = (
  isValid: boolean,
  nickname: string,
  count: number,
  args: {
    page?: string;
    tag?: string;
  },
) => {
  bookmarks?: ProjectOverview[];
  bookmarksTotalCount?: number;
  isLoading: boolean;
  isError: any;
};

const useUserBookmarksSWR: SWR = (isValid, nickname, count, args) => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    isValid && nickname
      ? {
          url: `/api/user/profile/${nickname}?tab=viewBookmarks&count=${count}`,
          args,
        }
      : null,
    bookmarksFetcher,
    {
      dedupingInterval: 60 * 10 * 1000,
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
    bookmarks: data?.data?.bookmarks,
    bookmarksTotalCount: data?.data?.total,
    isLoading,
    isError: error,
  };
};

export default useUserBookmarksSWR;
