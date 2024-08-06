import React from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { errorMessage } from '@/apis/config/errorMessage';
import { serialize } from '@/middleware/swr/serialize';
import { ENDPOINTS } from '@/apis/endpoints';
import {
  ProjectWriter,
  ProjectWriterAPIRes,
  projectWriterFetcher,
} from '@/apis/fetcher/projectWriterFetcher';

type SWR = (
  isValid: boolean,
  postId: string,
  args: {
    page?: string;
    tag?: string;
  },
) => {
  projectWriter?: ProjectWriter;
  isLoading: boolean;
  isError: any;
  projectWriterMutate: KeyedMutator<ProjectWriterAPIRes | undefined>;
};

const useProjectWriterSWR: SWR = (isValid, postId, args) => {
  const { data, error, isLoading, mutate } = useSWR(
    isValid && postId
      ? {
          url: ENDPOINTS.GET.PROJECT_WRITER(postId),
          args,
        }
      : null,
    projectWriterFetcher,
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
    projectWriter: data?.data,
    isError: error,
    isLoading,
    projectWriterMutate: mutate,
  };
};

export default useProjectWriterSWR;
