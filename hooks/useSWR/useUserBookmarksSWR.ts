import React from 'react';
import useSWR from 'swr';
import { serialize } from '@/middleware/swr/serialize';
import { errorMessage } from '@/apis/config/errorMessage';
import { bookmarksFetcher } from '@/apis/fetcher/bookmarksFetcher';
import { useRouter } from 'next/router';
import { ProjectOverview } from '@/typings';
import { ENDPOINTS } from '@/apis/endpoints';

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

/**
 * @param {boolean} isValid - controlling data requests based on conditions
 * @param {string} nickname - unique value required for data requests
 * @param {number} count - unique value required for data requests
 * @param {Object} args - page and tag for identifying data
 */
const useUserBookmarksSWR: SWR = (isValid, nickname, count, args) => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    isValid && nickname && count
      ? {
          url: ENDPOINTS.GET.USER_BOOKMARKS(nickname, count),
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
