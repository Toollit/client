import React from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { errorMessage } from '@/apis/config/errorMessage';
import { serialize } from '@/middleware/swr/serialize';
import { ENDPOINTS } from '@/apis/endpoints';
import {
  ProjectMember,
  ProjectMembersAPIRes,
  projectMembersFetcher,
} from '@/apis/fetcher/projectMembersFetcher';

type SWR = (
  isValid: boolean,
  postId: string,
  args: {
    page?: string;
    tag?: string;
  },
) => {
  projectMembers?: ProjectMember[];
  isLoading: boolean;
  isError: any;
  projectMembersMutate: KeyedMutator<ProjectMembersAPIRes | undefined>;
};

/**
 * @param {boolean} isValid - controlling data requests based on conditions
 * @param {string} postId - unique value required for data requests
 * @param {Object} args - page and tag for identifying data
 */
const useProjectMembersSWR: SWR = (isValid, postId, args) => {
  const { data, error, isLoading, mutate } = useSWR(
    isValid && postId
      ? {
          url: ENDPOINTS.GET.PROJECT_MEMBERS(postId),
          args,
        }
      : null,
    projectMembersFetcher,
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
    projectMembers: data?.data?.members,
    isError: error,
    isLoading,
    projectMembersMutate: mutate,
  };
};

export default useProjectMembersSWR;
