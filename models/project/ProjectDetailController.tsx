import React, { useEffect, useState, useCallback } from 'react';
import ProjectDetailView, { ProjectDetailViewProps } from './ProjectDetailView';
import { changeDateFormat, dateFromNow } from '@/utils/changeDateFormat';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import {
  ProjectAPIRes,
  ProjectMember,
  projectFetcher,
} from '@/apis/projectFetcher';
import { projectDetailBookmarkStatusKey, projectDetailKey } from '@/apis/keys';
import { errorMessage } from '@/apis/errorMessage';
import useAuth from '@/hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert, hideAlert } from '@/features/alert';
import { bookmarkAPI } from '@/apis/bookmark';
import { projectDetailBookmarkStatusFetcher } from '@/apis/projectDetailBookmarkStatusFetcher';
import { serialize } from '@/middleware/swr/serialize';
import useCachedKeys from '@/hooks/useCachedKeys';
import { deleteProjectAPI } from '@/apis/deleteProject';
import { openReport } from '@/features/report';
import { DeleteIcon, EditSquareIcon } from '@/assets/icons';
import useTooltip from '@/hooks/useTooltip';
import { RootState } from '@/store';
import { loading } from '@/features/loading';
import BlankProfile from '@/public/static/images/blank-profile-1280.png';
import { joinProjectAPI } from '@/apis/joinProject';

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

  const isLoading = useSelector((state: RootState) => state.isLoading.status);

  const [isClientRendering, setIsClientRendering] = useState(false);
  const [bookmarkAlertTimeoutId, setBookmarkAlertTimeoutId] =
    useState<NodeJS.Timeout>();
  const [shareAlertTimeoutId, setShareAlertTimeoutId] =
    useState<NodeJS.Timeout>();

  const { data: projectDetail } = useSWR(
    postId
      ? {
          url: projectDetailKey(postId),
          args: { page: `/project/${postId}`, tag: `project/${postId}` },
        }
      : null,
    projectFetcher,
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
    (memberTypes: ProjectAPIRes['data']['content']['memberTypes']) => {
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

        const response = await bookmarkAPI({ postId });
        const status = response?.data.status;

        bookmarkMutate();
        mutateCachedKeysWithTag({ tag: 'projectsBookmarksStatus' });
        mutateCachedKeysWithTag({ tag: 'projects' });

        clearTimeout(bookmarkAlertTimeoutId);

        if (status === 'save') {
          dispatch(showAlert({ type: 'success', text: '북마크 했습니다.' }));

          const timeoutId = setTimeout(() => {
            dispatch(hideAlert());
          }, 2000);

          setBookmarkAlertTimeoutId(timeoutId);
        }

        if (status === 'cancel') {
          dispatch(
            showAlert({ type: 'success', text: '북마크를 취소했습니다.' }),
          );

          const timeoutId = setTimeout(() => {
            dispatch(hideAlert());
          }, 2000);

          setBookmarkAlertTimeoutId(timeoutId);
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
    bookmarkAlertTimeoutId,
  ]);

  const handleShare = useCallback(() => {
    const fullUrl = process.env.NEXT_PUBLIC_CLIENT_HOST + router.asPath;

    navigator.clipboard.writeText(fullUrl);

    clearTimeout(shareAlertTimeoutId);

    dispatch(showAlert({ type: 'info', text: '주소가 복사되었습니다.' }));

    const timeoutId = setTimeout(() => {
      dispatch(hideAlert());
    }, 2000);

    setShareAlertTimeoutId(timeoutId);
  }, [dispatch, router, shareAlertTimeoutId]);

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
            dispatch(loading({ status: true }));

            await deleteProjectAPI({ postId });

            router.replace('/');

            router.events.on('routeChangeComplete', () => {
              dispatch(loading({ status: false }));
            });
          } catch (error) {
            dispatch(loading({ status: false }));
            errorMessage(error);
          }
        }
      }
    } catch (error) {
      errorMessage(error);
    }
  }, [postId, router, authMutate, setTooltipAnchorEl, dispatch]);

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
        //open report component
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

  const handleMemberProfiles = useCallback((value: ProjectMember) => {
    const checkImage = value.profiles.map((profile) => {
      return {
        nickname: profile.nickname,
        profileImage: profile.profileImage
          ? profile.profileImage
          : BlankProfile,
      };
    });

    return {
      profiles: checkImage,
      moreMemberCount:
        value.profiles.length > 6 ? `+${value.profiles.length - 6}` : null,
    };
  }, []);

  const handleJoinProject = useCallback(async () => {
    try {
      const response = await authMutate();

      if (response?.success) {
        return await joinProjectAPI({ postId });
      }

      if (!response?.success) {
        const result = confirm('로그인 후 이용 가능합니다.');

        if (result) {
          return router.push('/login');
        }

        if (!result) {
          return;
        }
      }
    } catch (error) {
      errorMessage(error);
    }
  }, [authMutate, router, postId]);

  useEffect(() => {
    setIsClientRendering(true);

    return () => {
      clearTimeout(bookmarkAlertTimeoutId);
      clearTimeout(shareAlertTimeoutId);
    };
  }, [bookmarkAlertTimeoutId, shareAlertTimeoutId]);

  const props: ProjectDetailViewProps = {
    me: projectDetail?.data.writer.nickname === accessUser,
    isClientRendering,
    postId,
    writer: projectDetail
      ? {
          nickname: projectDetail.data.writer.nickname,
          lastLoginAt: dateFromNow({
            date: projectDetail.data.writer.lastLoginAt,
          }),
          profileImage: projectDetail.data.writer.profileImage
            ? projectDetail.data.writer.profileImage
            : BlankProfile,
        }
      : undefined,
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
          representativeImage: projectDetail.data.content.representativeImage,
        }
      : undefined,
    member: projectDetail
      ? handleMemberProfiles(projectDetail.data.member)
      : undefined,
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
    handleJoinProject,
  };

  return <ProjectDetailView {...props} />;
};

export default ProjectDetailController;
