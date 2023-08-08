import React, { useEffect, useState, useCallback, useRef } from 'react';
import ProjectDetailView, { ProjectDetailViewProps } from './ProjectDetailView';
import { changeDateFormat, dateFromNow } from '@/utils/changeDateFormat';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import {
  ProjectDetailAPIRes,
  projectDetailFetcher,
} from '@/apis/projectDetailFetcher';
import {
  getProjectDetailBookmarkCheckKey,
  getProjectDetailKey,
} from '@/apis/keys';
import { errorMessage } from '@/apis/errorMessage';
import useAuth from '@/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { showAlert } from '@/features/alert';
import { bookmarkAPI } from '@/apis/bookmark';
import { projectDetailBookmarkCheckFetcher } from '@/apis/projectDetailBookmarkCheckFetcher';

type CustomMemberTypes = ('Developer' | 'Designer' | 'PM' | 'Anyone')[];

const ProjectDetailController = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const postId = router.query.id as string;

  // Current Access User Self Information
  const { nickname: accessUser, authMutate } = useAuth();

  const [isClientRendering, setIsClientRendering] = useState(false);

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

  const { data: bookmark, mutate: bookmarkMutate } = useSWR(
    postId ? getProjectDetailBookmarkCheckKey(postId) : null,
    projectDetailBookmarkCheckFetcher,
    {
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

  const handleBookmark = useCallback(async () => {
    const isMyProject = projectDetail?.data.writer.nickname === accessUser;

    const auth = await authMutate();

    if (!auth?.success) {
      alert('로그인 후 이용 가능합니다.');
      return router.push('/login');
    }

    if (isMyProject) {
      return alert('내가 작성한 게시글 입니다.');
    }

    try {
      const response = await bookmarkAPI({ postId: Number(postId) });

      bookmarkMutate();

      if (response?.message === 'save') {
        dispatch(showAlert({ type: 'success', text: '북마크 했습니다.' }));
      }

      if (response?.message === 'cancel') {
        dispatch(
          showAlert({ type: 'success', text: '북마크를 취소했습니다.' }),
        );
      }
    } catch (error) {
      errorMessage(error);
    }
  }, [
    projectDetail,
    accessUser,
    dispatch,
    postId,
    router,
    authMutate,
    bookmarkMutate,
  ]);

  const handleShare = useCallback(() => {
    const fullUrl = process.env.NEXT_PUBLIC_CLIENT_HOST + router.asPath;

    navigator.clipboard.writeText(fullUrl);

    dispatch(showAlert({ type: 'info', text: '주소가 복사되었습니다.' }));
  }, [dispatch, router]);

  useEffect(() => {
    setIsClientRendering(true);
  }, []);

  const props: ProjectDetailViewProps = {
    isClientRendering,
    me: projectDetail?.data.writer.nickname === accessUser,
    postId: postId,
    writer: projectDetail
      ? {
          nickname: projectDetail.data.writer.nickname,
          lastLoginAt: dateFromNow({
            date: projectDetail.data.writer.lastLoginAt,
          }),
          profileImage: projectDetail.data.writer.profileImage,
        }
      : projectDetail,
    content: projectDetail
      ? {
          title: projectDetail.data.content.title,
          contentHTML: projectDetail.data.content.contentHTML,
          contentMarkdown: projectDetail.data.content.contentMarkdown,
          views: projectDetail.data.content.views,
          createdAt: changeDateFormat({
            date: projectDetail.data.content.createdAt,
            format: 'YYMMDD_hhmm',
          }),
          updatedAt: changeDateFormat({
            date: projectDetail.data.content.updatedAt,
            format: 'YYMMDD_hhmm',
          }),
          hashtags: projectDetail.data.content.hashtags,
          memberTypes: handleMemberTypes(
            projectDetail.data.content.memberTypes,
          ),
          recruitNumber: projectDetail.data.content.recruitNumber,
        }
      : projectDetail,

    bookmark: bookmark?.data.bookmark,
    handleBookmark,
    handleShare,

    //TODO comment 추가하기
    //TODO trending post 추가하기
  };

  return <ProjectDetailView {...props} />;
};

export default ProjectDetailController;
