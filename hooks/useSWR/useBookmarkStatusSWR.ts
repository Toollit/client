import React from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { serialize } from '@/middleware/swr/serialize';
import {
  BookmarkStatusAPIRes,
  bookmarkStatusFetcher,
} from '@/apis/bookmarkStatusFetcher';
import { errorMessage } from '@/apis/config/errorMessage';
import { ENDPOINTS } from '@/apis/endpoints';

type SWR = (
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

const useBookmarkStatusSWR: SWR = (postId, args) => {
  const { data, error, isLoading, mutate } = useSWR(
    postId
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
