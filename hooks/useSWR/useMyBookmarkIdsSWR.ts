import React from 'react';
import useSWR from 'swr';
import { serialize } from '@/middleware/swr/serialize';
import { bookmarkIdsFetcher } from '@/apis/fetcher/bookmarkIdsFetcher';
import { errorMessage } from '@/apis/config/errorMessage';
import { ENDPOINTS } from '@/apis/endpoints';

type SWR = (
  isValid: boolean,
  args: { page?: string; tag?: string },
) => {
  bookmarkIds?: number[];
  isLoading: boolean;
  isError: any;
};

const useMyBookmarkIdsSWR: SWR = (isValid, args) => {
  const { data, error, isLoading, mutate } = useSWR(
    isValid
      ? {
          url: ENDPOINTS.GET.MY_BOOKMARK_IDS,
          args,
        }
      : null,
    bookmarkIdsFetcher,
    {
      dedupingInterval: 60 * 10 * 1000,
      errorRetryCount: 0,
      onError(err, key, config) {
        errorMessage(err);
      },
      use: [serialize],
    },
  );

  return {
    bookmarkIds: data?.data?.bookmarkIds,
    isError: error,
    isLoading,
    bookmarkIdsMutate: mutate,
  };
};

export default useMyBookmarkIdsSWR;
