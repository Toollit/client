import React from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { errorMessage } from '@/apis/config/errorMessage';
import { serialize } from '@/middleware/swr/serialize';
import { useRouter } from 'next/router';
import {
  ProjectAPIRes,
  ProjectContent,
  projectFetcher,
} from '@/apis/projectFetcher';
import { ENDPOINTS } from '@/apis/endpoints';

type SWR = (
  postId: string,
  page?: string,
  tag?: string,
) => {
  projectDetail?: ProjectContent;
  isLoading: boolean;
  isError: any;
  projectDetailMutate: KeyedMutator<ProjectAPIRes | undefined>;
};

const useProjectDetailSWR: SWR = (postId, page, tag) => {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(
    postId
      ? {
          url: ENDPOINTS.GET.PROJECT_DETAIL(postId),
          args: { page, tag },
        }
      : null,
    projectFetcher,
    {
      dedupingInterval: 60 * 10 * 1000,
      revalidateOnMount: false,
      revalidateOnFocus: false,
      errorRetryCount: 0,
      onError(err, key, config) {
        errorMessage(err);
      },
      use: [serialize],
    },
  );

  return {
    projectDetail: data?.data,
    isError: error,
    isLoading,
    projectDetailMutate: mutate,
  };
};

export default useProjectDetailSWR;
