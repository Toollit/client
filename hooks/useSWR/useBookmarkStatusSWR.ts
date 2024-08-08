import React from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { serialize } from '@/middleware/swr/serialize';
import {
  BookmarkStatusAPIRes,
  bookmarkStatusFetcher,
} from '@/apis/fetcher/bookmarkStatusFetcher';
import { errorMessage } from '@/apis/config/errorMessage';
import { ENDPOINTS } from '@/apis/endpoints';

type SWR = (
  isValid: boolean,
  postId: string,
  args: {
    page?: string;
    tag?: string;
  },
) => {
  bookmarkStatus?: boolean;
  postId?: number[];
  isLoading: boolean;
  isError: any;
  bookmarkStatusMutate: KeyedMutator<BookmarkStatusAPIRes | undefined>;
};

/**
 * @param {boolean} isValid - controlling data requests based on conditions
 * @param {string} postId - unique value required for data requests
 * @param {Object} args - page and tag for identifying data
 */
const useBookmarkStatusSWR: SWR = (isValid, postId, args) => {
  const { data, error, isLoading, mutate } = useSWR(
    isValid && postId
      ? {
          url: ENDPOINTS.GET.BOOKMARK_STATUS(postId),
          args,
        }
      : null,
    bookmarkStatusFetcher,
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
    bookmarkStatus: data?.data.bookmarkStatus,
    isError: error,
    isLoading,
    bookmarkStatusMutate: mutate,
  };
};

export default useBookmarkStatusSWR;
