import React from 'react';
import useSWR from 'swr';
import { serialize } from '@/middleware/swr/serialize';
import { bookmarksStatusFetcher } from '@/apis/bookmarksStatusFetcher';
import { errorMessage } from '@/apis/errorMessage';

type SWR = (
  page?: string,
  tag?: string,
) => {
  bookmarkIds?: number[];
  isLoading: boolean;
  isError: any;
};

const useMyBookmarksSWR: SWR = (page, tag) => {
  const { data, error, isLoading } = useSWR(
    {
      url: `/api/post/bookmark/bookmarksStatus`,
      args: { page, tag },
    },
    bookmarksStatusFetcher,
    {
      dedupingInterval: 60 * 10 * 1000,
      errorRetryCount: 0,
      onError(err, key, config) {
        errorMessage(err);
      },
      use: [serialize],
    },
  );

  return { bookmarkIds: data?.data.bookmarkIds, isLoading, isError: error };
};

export default useMyBookmarksSWR;
