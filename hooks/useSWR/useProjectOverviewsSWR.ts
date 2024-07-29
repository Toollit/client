import React from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { errorMessage } from '@/apis/config/errorMessage';
import { serialize } from '@/middleware/swr/serialize';
import {
  ProjectOverviewsAPIRes,
  projectOverviewsFetcher,
} from '@/apis/projectOverviewsFetcher';
import { ProjectOverview } from '@/typings';
import { ENDPOINTS } from '@/apis/endpoints';

type SWR = (
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

const useProjectOverviewsSWR: SWR = (pageNumber, postOrder, args) => {
  const { data, error, isLoading, mutate } = useSWR(
    {
      url: ENDPOINTS.GET.PROJECT_OVERVIEWS(pageNumber, postOrder),
      args,
    },
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
