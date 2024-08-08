import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { serialize } from '@/middleware/swr/serialize';
import { errorMessage } from '@/apis/config/errorMessage';
import { profileProjectsFetcher } from '@/apis/fetcher/profileProjectsFetcher';
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
          url: `/api/user/profile/${nickname}?tab=viewProjects&count=${count}`,
          args,
        }
      : null,
    profileProjectsFetcher,
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
