import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { serialize } from '@/middleware/swr/serialize';
import { errorMessage } from '@/apis/config/errorMessage';
import { userProjectsFetcher } from '@/apis/fetcher/userProjectsFetcher';
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
  projects?: ProjectOverview[];
  projectsTotalCount?: number;
  isLoading: boolean;
  isError: any;
};

/**
 * @param {boolean} isValid - controlling data requests based on conditions
 * @param {string} nickname - unique value required for data requests
 * @param {number} count - unique value required for data requests
 * @param {Object} args - page and tag for identifying data
 */
const useUserProjectsSWR: SWR = (isValid, nickname, count, args) => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    isValid && nickname && count
      ? {
          url: ENDPOINTS.GET.USER_PROJECTS(nickname, count),
          args,
        }
      : null,
    userProjectsFetcher,
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
    projectsTotalCount: data?.data?.total,
    isLoading,
    isError: error,
  };
};

export default useUserProjectsSWR;
