import React, { useEffect, useState, useCallback, FC } from 'react';
import ProjectDetailView, { ViewProps } from './ProjectDetailView';
import { changeDateFormat, dateFromNow } from '@/utils/changeDateFormat';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ProjectAPIRes } from '@/apis/projectFetcher';
import { bookmarkStatusKey } from '@/apis/keys';
import { errorMessage } from '@/apis/config/errorMessage';
import useAuth from '@/hooks/useAuth';
import { showAlert, hideAlert } from '@/features/alert';
import { bookmarkAPI } from '@/apis/bookmark';
import { bookmarkStatusFetcher } from '@/apis/bookmarkStatusFetcher';
import { serialize } from '@/middleware/swr/serialize';
import useCachedKeys from '@/hooks/useCachedKeys';
import { deleteProjectAPI } from '@/apis/deleteProject';
import { openReport } from '@/features/report';
import { loading } from '@/features/loading';
import { joinProjectAPI } from '@/apis/joinProject';
import { leaveProjectAPI } from '@/apis/leaveProject';
import { useAppDispatch } from '@/store';
import { CapitalizedMemberTypes } from '@/typings';
import useProjectDetailSWR from '@/hooks/useSWR/useProjectDetailSWR';

export interface ControllerProps {}

const ProjectDetailController: FC<ControllerProps> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, authMutate } = useAuth();
  const { mutateTag, mutatePage } = useCachedKeys();

  const postId = router.query.id as string;

  const [isClientRendering, setIsClientRendering] = useState(false);
  const [bookmarkAlertTimeoutId, setBookmarkAlertTimeoutId] =
    useState<NodeJS.Timeout>();
  const [shareAlertTimeoutId, setShareAlertTimeoutId] =
    useState<NodeJS.Timeout>();

  const { projectDetail, projectDetailMutate } = useProjectDetailSWR(
    postId,
    `/project/${postId}`,
    `/project/${postId}`,
  );

  const { data: bookmark, mutate: bookmarkMutate } = useSWR(
    postId
      ? {
          url: bookmarkStatusKey(postId),
          args: {
            page: `/project/${postId}`,
            tag: 'projectDetailBookmarkStatus',
          },
        }
      : null,
    bookmarkStatusFetcher,
    {
      dedupingInterval: 60 * 10 * 1000,
      errorRetryCount: 0,
      onError(err, key, config) {
        errorMessage(err);
      },
      use: [serialize],
    },
  );

  const handleConvertMemberTypes = useCallback(
    (memberTypes: ProjectAPIRes['data']['content']['memberTypes']) => {
      const convertedMemberTypes = memberTypes.map((type) => {
        return type === 'pm'
          ? type.toUpperCase()
          : type.charAt(0).toUpperCase() + type.slice(1);
      }) as CapitalizedMemberTypes[];

      return convertedMemberTypes;
    },
    [],
  );

  const handleBookmark = useCallback(async () => {
    try {
      const auth = await authMutate();

      if (!auth?.success) {
        return router.push('/signin');
      }

      if (auth?.success) {
        const isMyProject =
          projectDetail?.writer.nickname === auth.data.nickname;

        if (isMyProject) {
          return alert('내가 작성한 게시글 입니다.');
        }

        const response = await bookmarkAPI({ postId });
        const status = response?.data.status;

        bookmarkMutate();
        mutateTag({ tag: 'bookmarksStatus' });
        mutateTag({ tag: 'projectOverviews' });

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
    mutateTag,
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

  const handleModify = useCallback(async () => {
    try {
      const auth = await authMutate();

      if (!auth?.success) {
        return router.push('/signin');
      }

      if (auth?.success) {
        return router.push(`/modify/project/${postId}`);
      }
    } catch (error) {
      errorMessage(error);
    }
  }, [router, postId, authMutate]);

  const handleDelete = useCallback(async () => {
    try {
      const auth = await authMutate();

      if (!auth?.success) {
        return router.push('/signin');
      }

      if (auth?.success) {
        const isDeletedOk = confirm('정말로 삭제하시겠습니까?');

        if (isDeletedOk) {
          try {
            dispatch(loading({ status: true }));

            await deleteProjectAPI({ postId });

            mutatePage({ page: '/' });

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
  }, [postId, router, authMutate, dispatch, mutatePage]);

  const handleReport = useCallback(async () => {
    try {
      const auth = await authMutate();

      if (!auth?.success) {
        return router.push('/signin');
      }

      if (auth?.success) {
        //open report component
        dispatch(
          openReport({
            postType: 'project',
            postId: Number(postId),
            writer: projectDetail?.writer.nickname ?? '',
            title: projectDetail?.content.title ?? '',
          }),
        );
      }
    } catch (error) {
      errorMessage(error);
    }
  }, [dispatch, router, authMutate, postId, projectDetail]);

  const handleJoinProject = useCallback(async () => {
    const result = confirm('프로젝트에 참가하시겠습니까?');

    if (!result) {
      return;
    }

    try {
      dispatch(loading({ status: true }));

      const auth = await authMutate();

      if (!auth?.success) {
        router.push('/signin');
      }

      if (auth?.success) {
        await joinProjectAPI({ postId });
        alert(
          '참가 신청을 했습니다. 프로젝트 장이 승인 후 프로젝트 멤버가 됩니다.',
        );
      }

      dispatch(loading({ status: false }));
    } catch (error) {
      dispatch(loading({ status: false }));
      errorMessage(error);
    }
  }, [dispatch, authMutate, router, postId]);

  const handleLeaveProject = useCallback(async () => {
    const result = confirm(
      '프로젝트를 탈퇴하시겠습니까? 재가입이 가능하나 승인이 필요합니다.',
    );

    if (!result) {
      return;
    }

    try {
      dispatch(loading({ status: true }));

      const auth = await authMutate();

      if (auth?.success) {
        await leaveProjectAPI({ postId });

        projectDetailMutate();

        alert('프로젝트를 탈퇴 했습니다.');
      }

      if (!auth?.success) {
        router.push('/signin');
      }

      dispatch(loading({ status: false }));
    } catch (error) {
      dispatch(loading({ status: false }));
      errorMessage(error);
    }
  }, [dispatch, authMutate, projectDetailMutate, postId, router]);

  const handleCheckMember = useCallback(
    (data?: ProjectAPIRes['data']) => {
      const founded = data?.member.profiles.find(
        (profile) => profile.nickname === user?.nickname,
      );

      const isMyPost = data?.writer.nickname === user?.nickname;

      if (isMyPost) {
        // project owner. show join text
        return false;
      } else {
        if (founded) {
          // project member. show leave text
          return true;
        } else {
          // not project member. show join text
          return false;
        }
      }
    },
    [user],
  );

  const handleCheckRecruitComplete = useCallback(
    (data?: ProjectAPIRes['data']) => {
      if (!data) {
        return false;
      }

      const members = data.member.profiles.length;
      if (typeof members !== 'number') {
        return false;
      }

      return data.content.recruitCount === members - 1;
    },
    [],
  );

  useEffect(() => {
    setIsClientRendering(true);

    return () => {
      hideAlert();
    };
  }, [bookmarkAlertTimeoutId, shareAlertTimeoutId]);

  const props: ViewProps = {
    isMyPost: projectDetail?.writer.nickname === user?.nickname,
    isRecruitCompleted: handleCheckRecruitComplete(projectDetail),
    isMember: handleCheckMember(projectDetail),
    isClientRendering,
    writer: projectDetail
      ? {
          nickname: projectDetail.writer.nickname,
          lastSigninAt: dateFromNow({
            date: projectDetail.writer.lastSigninAt,
          }),
          profileImage: projectDetail.writer.profileImage,
        }
      : projectDetail,
    content: projectDetail
      ? {
          id: projectDetail.content.id,
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
          memberTypes: handleConvertMemberTypes(
            projectDetail.content.memberTypes,
          ),
          recruitCount: projectDetail.content.recruitCount,
          representativeImage: projectDetail.content.representativeImage,
        }
      : projectDetail,
    member: projectDetail?.member,
    bookmark: bookmark?.data.bookmark,
    handleBookmark,
    handleShare,
    handleModify,
    handleDelete,
    handleReport,
    handleJoinProject,
    handleLeaveProject,
  };

  return <ProjectDetailView {...props} />;
};

export default ProjectDetailController;
