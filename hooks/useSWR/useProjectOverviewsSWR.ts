import React from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { errorMessage } from '@/apis/errorMessage';
import { serialize } from '@/middleware/swr/serialize';
import {
  ProjectOverviewsAPIRes,
  projectOverviewsFetcher,
} from '@/apis/projectOverviewsFetcher';
import { ProjectOverview } from '@/typings';
import { projectOverviewsKey } from '@/apis/keys';

type SWR = (
  pageNumber: number,
  postOrder: 'new' | 'popularity',
  page?: string,
  tag?: string,
) => {
  projectOverviews?: ProjectOverview[];
  totalPage?: number;
  isLoading: boolean;
  isError: any;
  projectOverviewsMutate: KeyedMutator<ProjectOverviewsAPIRes | undefined>;
};

const useProjectOverviewsSWR: SWR = (pageNumber, postOrder, page, tag) => {
  const { data, error, isLoading, mutate } = useSWR(
    {
      url: projectOverviewsKey(pageNumber, postOrder),
      args: { page, tag },
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
