import React, { useEffect, useState, useCallback } from 'react';
import ProjectDetailView, { ProjectDetailViewProps } from './ProjectDetailView';
import { changeDateFormat, dateFromNow } from '@/utils/changeDateFormat';
import { useRouter } from 'next/router';
import LoadingCircularProgress from '@/components/commons/loading';
import useSWR from 'swr';
import {
  ProjectDetailAPIRes,
  projectDetailFetcher,
} from '@/apis/projectDetailFetcher';
import { getProjectDetailKey } from '@/apis/keys';
import { errorMessage } from '@/apis/errorMessage';
import useAuth from '@/hooks/useAuth';

type CustomMemberTypes = ('Developer' | 'Designer' | 'PM' | 'Anyone')[];

const ProjectDetailController = () => {
  const [isClientRendering, setIsClientRendering] = useState(false);

  useEffect(() => {
    setIsClientRendering(true);
  }, []);

  // Current Access User Self Information
  const { nickname: accessUser } = useAuth();

  const router = useRouter();
  const postId = router.query.id as string;

  const { data: projectDetail } = useSWR(
    postId ? getProjectDetailKey(postId) : null,
    projectDetailFetcher,
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
      errorRetryCount: 0,
      onError(err, key, config) {
        errorMessage(err);
      },
    },
  );

  const handleMemberTypes = useCallback(
    (memberTypes: ProjectDetailAPIRes['data']['content']['memberTypes']) => {
      const dataConverter = memberTypes.map((type) => {
        return type === 'pm'
          ? type.toUpperCase()
          : type.charAt(0).toUpperCase() + type.slice(1);
      }) as CustomMemberTypes;

      return dataConverter;
    },
    [],
  );

  if (!projectDetail) {
    return <LoadingCircularProgress />;
  }

  const props: ProjectDetailViewProps = {
    isClientRendering,
    writer: {
      nickname: projectDetail.writer.nickname,
      lastLoginAt: dateFromNow({
        date: projectDetail.writer.lastLoginAt,
      }),
      profileImage: projectDetail.writer.profileImage,
    },
    content: {
      title: projectDetail.content.title,
      contentHTML: projectDetail.content.contentHTML,
      contentMarkdown: projectDetail.content.contentMarkdown,
      views: projectDetail.content.views,
      createdAt: changeDateFormat({
        date: projectDetail.content.createdAt,
        format: 'YYMMDD_hhmm',
      }),
      updatedAt: changeDateFormat({
        date: projectDetail.content.updatedAt,
        format: 'YYMMDD_hhmm',
      }),
      hashtags: projectDetail.content.hashtags,
      memberTypes: handleMemberTypes(projectDetail.content.memberTypes),
      recruitNumber: projectDetail.content.recruitNumber,
    },
    me: {
      nickname: accessUser,
    },

    //TODO comment 추가하기
    //TODO trending post 추가하기
  };

  return <ProjectDetailView {...props} />;
};

export default ProjectDetailController;
