import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { serialize } from '@/middleware/swr/serialize';
import { errorMessage } from '@/apis/errorMessage';
import { Project } from '@/apis/profileProjectsFetcher';
import { searchFetcher } from '@/apis/searchFetcher';

type SWR = (
  searchText: string,
  page?: string,
  tag?: string,
) => {
  projects?: Project[];
  isLoading: boolean;
  isError: any;
};

const useSearchProjectsSWR: SWR = (searchText, page, tag) => {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(
    searchText
      ? {
          url: `/api/search?q=${encodeURIComponent(searchText)}`,
          args: { page, tag },
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
    isLoading,
    isError: error,
  };
};

export default useSearchProjectsSWR;
