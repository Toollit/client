import React from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { errorMessage } from '@/apis/config/errorMessage';
import { serialize } from '@/middleware/swr/serialize';
import {
  ProjectDetailAPIRes,
  projectDetailFetcher,
} from '@/apis/fetcher/projectDetailFetcher';
import { ENDPOINTS } from '@/apis/endpoints';
import { ProjectDetail } from '@/typings';

type SWR = (
  isValid: boolean,
  postId: string,
  args: {
    page?: string;
    tag?: string;
  },
) => {
  projectDetail?: ProjectDetail;
  isLoading: boolean;
  isError: any;
  projectDetailMutate: KeyedMutator<ProjectDetailAPIRes | undefined>;
};

const useProjectDetailSWR: SWR = (isValid, postId, args) => {
  const { data, error, isLoading, mutate } = useSWR(
    isValid && postId
      ? {
          url: ENDPOINTS.GET.PROJECT_DETAIL(postId),
          args,
        }
      : null,
    projectDetailFetcher,
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
