import React, { useEffect, useState } from 'react';
import ProjectDetailView, { ProjectDetailViewProps } from './ProjectDetailView';
import { changeDateFormat, dateFromNow } from '@/utils/changeDateFormat';
import { useRouter } from 'next/router';
import LoadingCircularProgress from '@/components/commons/loading';
import useSWR from 'swr';
import { getProjectDetailFetcher } from '@/apis/getProjectDetailFetcher';
import { GET_PROJECT_DETAIL_API_ENDPOINT } from '@/apis/keys';
import { errorMessage } from '@/apis/errorMessage';
import useAuth from '@/hooks/useAuth';

const ProjectDetailController = () => {
  const [isClientRendering, setIsClientRendering] = useState(false);

  useEffect(() => {
    setIsClientRendering(true);
  }, []);

  const { nickname } = useAuth({});

  const router = useRouter();
  const postId = router.query.id;

  const { data: projectDetail } = useSWR(
    GET_PROJECT_DETAIL_API_ENDPOINT + `/${postId}`,
    getProjectDetailFetcher,
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
      errorRetryCount: 0,
      onError(err, key, config) {
        errorMessage(err);
      },
    },
  );

  if (!projectDetail) {
    return <LoadingCircularProgress />;
  }

  const props: ProjectDetailViewProps = {
    isClientRendering,
    content: {
      title: projectDetail.content.title,
      createdAt: changeDateFormat({
        date: projectDetail.content.createdAt,
        format: 'YYMMDD_hhmm',
      }),
      updatedAt: changeDateFormat({
        date: projectDetail.content.updatedAt,
        format: 'YYMMDD_hhmm',
      }),
      views: projectDetail.content.views,
      nickname: projectDetail.writer.nickname,
      contentHTML: projectDetail.content.contentHTML,
      contentMarkdown: projectDetail.content.contentMarkdown,
      hashtags: projectDetail.content.hashtags,
      memberTypes: projectDetail.content.memberTypes,
    },
    writer: {
      nickname: projectDetail.writer.nickname,
      lastLoginAt: dateFromNow({
        date: projectDetail.writer.lastLoginAt,
      }),
      profileImage: projectDetail.writer.profileImage,
    },
    me: {
      nickname,
    },

    //TODO comment 추가하기
    //TODO trending post 추가하기
  };

  return <ProjectDetailView {...props} />;
};

export default ProjectDetailController;
