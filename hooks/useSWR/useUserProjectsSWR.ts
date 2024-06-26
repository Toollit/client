import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { serialize } from '@/middleware/swr/serialize';
import { errorMessage } from '@/apis/errorMessage';
import { Project, profileProjectsFetcher } from '@/apis/profileProjectsFetcher';

type SWR = (
  nickname: string,
  count: number,
  page?: string,
  tag?: string,
) => {
  projects?: Project[];
  projectsTotalCount?: number;
  isLoading: boolean;
  isError: any;
};

const useUserProjectsSWR: SWR = (nickname, count, page, tag) => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    nickname
      ? {
          url: `/api/user/profile/${nickname}?tab=viewProjects&count=${count}`,
          args: { page, tag },
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
