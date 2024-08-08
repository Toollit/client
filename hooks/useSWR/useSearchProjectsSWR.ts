import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { serialize } from '@/middleware/swr/serialize';
import { errorMessage } from '@/apis/config/errorMessage';
import { searchFetcher } from '@/apis/fetcher/searchFetcher';
import { ProjectOverview } from '@/typings';

type SWR = (
  isValid: boolean,
  searchText: string,
  args: {
    page?: string;
    tag?: string;
  },
) => {
  projects?: ProjectOverview[];
  isLoading: boolean;
  isError: any;
};

/**
 * @param {boolean} isValid - controlling data requests based on conditions
 * @param {string} searchText - unique value required for data requests
 * @param {Object} args - page and tag for identifying data
 */
const useSearchProjectsSWR: SWR = (isValid, searchText, args) => {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(
    isValid && searchText
      ? {
          url: `/api/search?q=${encodeURIComponent(searchText)}`,
          args,
        }
      : null,
    searchFetcher,
    {
      dedupingInterval: 1000 * 60 * 10,
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
    projects: data?.data?.projects,
    isError: error,
    isLoading,
    searchProjectsMutate: mutate,
  };
};

export default useSearchProjectsSWR;
