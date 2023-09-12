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
import { deletePostAPI } from '@/apis/deletePost';
import { openReport } from '@/features/report';
import { DeleteIcon, EditSquareIcon } from '@/assets/icons';
import useTooltip from '@/hooks/useTooltip';

type CustomMemberTypes = ('Developer' | 'Designer' | 'PM' | 'Anyone')[];

const ProjectDetailController = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { nickname: accessUser, authMutate } = useAuth();
  const { mutateCachedKeysWithTag } = useCachedKeys();
  const {
    tooltipAnchorEl,
    setTooltipAnchorEl,
    tooltipOpen,
    handleTooltipOpen,
    handleTooltipClose,
  } = useTooltip();

  const postId = router.query.id as string;

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
    try {
      const auth = await authMutate();

      if (!auth?.success) {
        const wantsToLogin = confirm('로그인 후 이용 가능합니다.');

        if (wantsToLogin) {
          return router.push('/login');
        }
      }

      if (auth?.success) {
        const isMyProject =
          projectDetail?.data.writer.nickname === auth.data.nickname;

        if (isMyProject) {
          return alert('내가 작성한 게시글 입니다.');
        }

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
      }
    } catch (error) {
      errorMessage(error);
    }
  }, [
    projectDetail,
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

  const handleTooltipModify = useCallback(async () => {
    setTooltipAnchorEl(null);

    try {
      const auth = await authMutate();

      if (!auth?.success) {
        const wantsToLogin = confirm('로그인 후 이용 가능합니다.');

        if (wantsToLogin) {
          return router.push('/login');
        }
      }

      if (auth?.success) {
        return router.push(`/modify/project/${postId}`);
      }
    } catch (error) {
      errorMessage(error);
    }
  }, [router, postId, authMutate, setTooltipAnchorEl]);

  const handleTooltipDelete = useCallback(async () => {
    setTooltipAnchorEl(null);

    try {
      const auth = await authMutate();

      if (!auth?.success) {
        const wantsToLogin = confirm('로그인 후 이용 가능합니다.');

        if (wantsToLogin) {
          return router.push('/login');
        }
      }

      if (auth?.success) {
        const isDeletedOk = confirm('정말로 삭제하시겠습니까?');

        if (isDeletedOk) {
          try {
            await deletePostAPI({ postType: 'project', postId });

            router.replace('/');
          } catch (error) {
            errorMessage(error);
          }
        }
      }
    } catch (error) {
      errorMessage(error);
    }
  }, [postId, router, authMutate, setTooltipAnchorEl]);

  const handleTooltipReport = useCallback(async () => {
    try {
      const auth = await authMutate();

      if (!auth?.success) {
        const wantsToLogin = confirm('로그인 후 이용 가능합니다.');

        if (wantsToLogin) {
          return router.push('/login');
        }
      }

      if (auth?.success) {
        setTooltipAnchorEl(null);
        dispatch(
          openReport({
            postType: 'project',
            postId: Number(postId),
            writer: projectDetail?.data.writer.nickname ?? '',
            title: projectDetail?.data.content.title ?? '',
          }),
        );
      }
    } catch (error) {
      errorMessage(error);
    }
  }, [dispatch, router, authMutate, postId, projectDetail, setTooltipAnchorEl]);

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

    handleBookmark,
    handleShare,
    handleTooltipOpen,
    tooltip: {
      items:
        projectDetail?.data.writer.nickname === accessUser
          ? [
              {
                text: '수정',
                icon: <EditSquareIcon />,
                handler: handleTooltipModify,
              },
              {
                text: '삭제',
                icon: <DeleteIcon />,
                handler: handleTooltipDelete,
              },
            ]
          : [{ text: '신고', handler: handleTooltipReport }],

      anchorEl: tooltipAnchorEl,
      open: tooltipOpen,
      onClose: handleTooltipClose,
    },

    //TODO comment 추가하기
    //TODO trending post 추가하기
  };

  return <ProjectDetailView {...props} />;
};

export default ProjectDetailController;
