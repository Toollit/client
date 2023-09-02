import React, { useEffect, useState, useCallback } from 'react';
import ProjectDetailView, { ProjectDetailViewProps } from './ProjectDetailView';
import { changeDateFormat, dateFromNow } from '@/utils/changeDateFormat';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import {
  ProjectDetailAPIRes,
  projectDetailFetcher,
} from '@/apis/projectDetailFetcher';
import { projectDetailBookmarkStatusKey, projectDetailKey } from '@/apis/keys';
import { errorMessage } from '@/apis/errorMessage';
import useAuth from '@/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { showAlert, hideAlert } from '@/features/alert';
import { bookmarkAPI } from '@/apis/bookmark';
import { projectDetailBookmarkStatusFetcher } from '@/apis/projectDetailBookmarkStatusFetcher';
import { serialize } from '@/middleware/swr/serialize';
import useCachedKeys from '@/hooks/useCachedKeys';

type CustomMemberTypes = ('Developer' | 'Designer' | 'PM' | 'Anyone')[];

const ProjectDetailController = () => {
  const dispatch = useDispatch();
  const { mutateCachedKeysWithTag } = useCachedKeys();

  const router = useRouter();
  const postId = router.query.id as string;

  // Current Access User Self Information
  const { nickname: accessUser, authMutate } = useAuth();

  const [isClientRendering, setIsClientRendering] = useState(false);

  const { data: projectDetail } = useSWR(
    postId
      ? {
          url: projectDetailKey(postId),
          args: { page: `/project/${postId}`, tag: `project/${postId}` },
        }
      : null,
    projectDetailFetcher,
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

  const { data: bookmark, mutate: bookmarkMutate } = useSWR(
    postId
      ? {
          url: projectDetailBookmarkStatusKey(postId),
          args: {
            page: `/project/${postId}`,
            tag: 'projectDetailBookmarkStatus',
          },
        }
      : null,
    projectDetailBookmarkStatusFetcher,
    {
      dedupingInterval: 60 * 10 * 1000,
      errorRetryCount: 0,
      onError(err, key, config) {
        errorMessage(err);
      },
      use: [serialize],
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
      mutateCachedKeysWithTag({ tag: 'projectsBookmarksStatus' });
      mutateCachedKeysWithTag({ tag: 'projects' });

      if (response?.message === 'save') {
        dispatch(showAlert({ type: 'success', text: '북마크 했습니다.' }));

        setTimeout(() => {
          dispatch(hideAlert());
        }, 2000);
      }

      if (response?.message === 'cancel') {
        dispatch(
          showAlert({ type: 'success', text: '북마크를 취소했습니다.' }),
        );

        setTimeout(() => {
          dispatch(hideAlert());
        }, 2000);
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
    mutateCachedKeysWithTag,
  ]);

  const handleShare = useCallback(() => {
    const fullUrl = process.env.NEXT_PUBLIC_CLIENT_HOST + router.asPath;

    navigator.clipboard.writeText(fullUrl);

    dispatch(showAlert({ type: 'info', text: '주소가 복사되었습니다.' }));

    setTimeout(() => {
      dispatch(hideAlert());
    }, 2000);
  }, [dispatch, router]);

  useEffect(() => {
    setIsClientRendering(true);
  }, []);

  const props: ProjectDetailViewProps = {
    isClientRendering,
    postId,
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
    tooltip: {
      writer: projectDetail?.data.writer.nickname,
      title: projectDetail?.data.content.title,
    },
    handleBookmark,
    handleShare,

    //TODO comment 추가하기
    //TODO trending post 추가하기
  };

  return <ProjectDetailView {...props} />;
};

export default ProjectDetailController;
