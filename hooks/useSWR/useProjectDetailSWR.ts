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
  isUpdate?: boolean,
) => {
  projectDetail?: ProjectDetail;
  isLoading: boolean;
  isError: any;
  projectDetailMutate: KeyedMutator<ProjectDetailAPIRes | undefined>;
};

/**
 * @param {boolean} isValid - controlling data requests based on conditions
 * @param {string} postId - unique value required for data requests
 * @param {Object} args - page and tag for identifying data
 * @param {boolean} isUpdate - check whether it is requested for modification
 */
const useProjectDetailSWR: SWR = (isValid, postId, args, isUpdate = false) => {
  const { data, error, isLoading, mutate } = useSWR(
    isValid && postId
      ? !isUpdate
        ? {
            url: ENDPOINTS.GET.PROJECT_DETAIL(postId),
            args,
          }
        : {
            url: ENDPOINTS.GET.PROJECT_DETAIL(postId),
            args,
            config: {
              headers: {
                modify: true,
              },
            },
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
