import React from 'react';
import useSWR from 'swr';
import { serialize } from '@/middleware/swr/serialize';
import { errorMessage } from '@/apis/errorMessage';
import { bookmarksFetcher } from '@/apis/bookmarksFetcher';
import { useRouter } from 'next/router';
import { Project } from '@/typings';

type SWR = (
  nickname: string,
  count: number,
  page?: string,
  tag?: string,
) => {
  bookmarks?: Project[];
  bookmarksTotalCount?: number;
  isLoading: boolean;
  isError: any;
};

const useUserBookmarksSWR: SWR = (nickname, count, page, tag) => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    nickname
      ? {
          url: `/api/user/profile/${nickname}?tab=viewBookmarks&count=${count}`,
          args: { page, tag },
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
