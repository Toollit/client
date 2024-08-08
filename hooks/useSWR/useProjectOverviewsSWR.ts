import React from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { errorMessage } from '@/apis/config/errorMessage';
import { serialize } from '@/middleware/swr/serialize';
import {
  ProjectOverviewsAPIRes,
  projectOverviewsFetcher,
} from '@/apis/fetcher/projectOverviewsFetcher';
import { ProjectOverview } from '@/typings';
import { ENDPOINTS } from '@/apis/endpoints';

type SWR = (
  isValid: boolean,
  pageNumber: number,
  postOrder: 'new' | 'popularity',
  args: {
    page?: string;
    tag?: string;
  },
) => {
  projectOverviews?: ProjectOverview[];
  totalPage?: number;
  isLoading: boolean;
  isError: any;
  projectOverviewsMutate: KeyedMutator<ProjectOverviewsAPIRes | undefined>;
};

/**
 * @param {boolean} isValid - controlling data requests based on conditions
 * @param {number} pageNumber - unique value required for data requests
 * @param {string} postOrder - unique value required for data requests (possible values: "new" or "popularity")
 * @param {Object} args - page and tag for identifying data
 */
const useProjectOverviewsSWR: SWR = (isValid, pageNumber, postOrder, args) => {
  const { data, error, isLoading, mutate } = useSWR(
    isValid && pageNumber && postOrder
      ? {
          url: ENDPOINTS.GET.PROJECT_OVERVIEWS(pageNumber, postOrder),
          args,
        }
      : null,
    projectOverviewsFetcher,
    {
      dedupingInterval: 60 * 10 * 1000,
      revalidateOnMount: false,
      errorRetryCount: 0,
      onError(err, key, config) {
        errorMessage(err);
      },
      use: [serialize],
    },
  );

  return {
    projectOverviews: data?.data.projectOverviews,
    totalPage: data?.data.totalPage,
    isError: error,
    isLoading,
    projectOverviewsMutate: mutate,
  };
};

export default useProjectOverviewsSWR;
