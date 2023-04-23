import React from 'react';
import ProjectDetailView, { ProjectDetailViewProps } from './ProjectDetailView';
import { changeDateFormat, dateFromNow } from '@/utils/changeDateFormat';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/router';
import LoadingCircularProgress from '@/components/commons/loading';
import useSWR from 'swr';
import { getProjectDetailFetcher } from '@/apis/getProjectDetailFetcher';
import { GET_PROJECT_DETAIL_API_ENDPOINT } from '@/apis/keys';

const ProjectDetailController = () => {
  const me = useSelector((state: RootState) => state.user.nickname);

  const router = useRouter();
  const postId = router.query.id;

  const { data, isLoading, error } = useSWR(
    GET_PROJECT_DETAIL_API_ENDPOINT + `/${postId}`,
    getProjectDetailFetcher,
    { revalidateOnMount: false, revalidateOnFocus: false },
  );

  if (!data) {
    return <LoadingCircularProgress />;
  }

  const props: ProjectDetailViewProps = {
    content: {
      title: data.content.title,
      createdAt: changeDateFormat({
        date: data.content.createdAt,
        format: 'YYMMDD_hhmm',
      }),
      updatedAt: changeDateFormat({
        date: data.content.updatedAt,
        format: 'YYMMDD_hhmm',
      }),
      views: data.content.views,
      nickname: data.writer.nickname,
      contentHTML: data.content.contentHTML,
      contentMarkdown: data.content.contentMarkdown,
      hashtags: data.content.hashtags,
      memberTypes: data.content.memberTypes,
    },
    writer: {
      nickname: data.writer.nickname,
      lastLoginAt: dateFromNow({
        date: data.writer.lastLoginAt,
      }),
      profileImage: data.writer.profileImage,
    },
    me: {
      nickname: me ? me : null,
    },

    //TODO comment 추가하기
    //TODO trending post 추가하기
  };

  return <ProjectDetailView {...props} />;
};

export default ProjectDetailController;
