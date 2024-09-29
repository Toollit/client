import React, { useEffect, useState, useCallback, FC } from 'react';
import ProjectDetailView, { ViewProps } from './ProjectDetailView';
import { changeDateFormat, dateFromNow } from '@/utils/changeDateFormat';
import { useRouter } from 'next/router';
import { ProjectDetailAPIRes } from '@/apis/fetcher/projectDetailFetcher';
import { errorMessage } from '@/apis/config/errorMessage';
import useAuth from '@/hooks/useAuth';
import { showAlert, hideAlert } from '@/features/alert';
import { updateBookmarkAPI } from '@/apis/updateBookmark';
import useCachedKeys from '@/hooks/useCachedKeys';
import { deleteProjectAPI } from '@/apis/deleteProject';
import { openReport } from '@/features/report';
import { fullScreenLoading } from '@/features/loading';
import { createProjectJoinRequestAPI } from '@/apis/createProjectJoinRequest';
import { deleteProjectMemberAPI } from '@/apis/deleteProjectMember';
import { useAppDispatch } from '@/store';
import { CapitalizedMemberTypes, ProjectDetail } from '@/typings';
import useProjectDetailSWR from '@/hooks/useSWR/useProjectDetailSWR';
import useBookmarkStatusSWR from '@/hooks/useSWR/useBookmarkStatusSWR';
import useProjectWriterSWR from '@/hooks/useSWR/useProjectWriterSWR';
import useProjectMembersSWR from '@/hooks/useSWR/useProjectMembersSWR';
import { ProjectWriter } from '@/apis/fetcher/projectWriterFetcher';
import { ProjectMember } from '@/apis/fetcher/projectMembersFetcher';

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
    true,
    postId,
    {
      page: `/project/${postId}`,
      tag: `project${postId}`,
    },
  );

  const { projectWriter } = useProjectWriterSWR(true, postId, {
    page: `/project/${postId}`,
    tag: `project${postId}Writer`,
  });

  const { projectMembers } = useProjectMembersSWR(true, postId, {
    page: `/project/${postId}`,
    tag: `project${postId}Members`,
  });

  const { bookmarkStatus, bookmarkStatusMutate } = useBookmarkStatusSWR(
    true,
    postId,
    { page: `/project/${postId}`, tag: `project${postId}BookmarkStatus` },
  );

  const handleConvertMemberTypes = useCallback(
    (memberTypes: ProjectDetailAPIRes['data']['memberTypes']) => {
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
        const isMyProject = projectWriter?.nickname === auth.data.nickname;

        if (isMyProject) {
          return alert('내가 작성한 게시글 입니다.');
        }

        const response = await updateBookmarkAPI({ postId });
        const status = response?.data.status;

        bookmarkStatusMutate();
        mutateTag({ tag: 'bookmarkIds' });
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
    projectWriter,
    dispatch,
    postId,
    router,
    authMutate,
    bookmarkStatusMutate,
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
            dispatch(fullScreenLoading(true));

            await deleteProjectAPI({ postId });

            mutatePage({ page: '/' });

            router.replace('/');

            router.events.on('routeChangeComplete', () => {
              dispatch(fullScreenLoading(false));
            });
          } catch (error) {
            dispatch(fullScreenLoading(false));
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
            writer: projectWriter?.nickname ?? '',
            title: projectDetail?.title ?? '',
          }),
        );
      }
    } catch (error) {
      errorMessage(error);
    }
  }, [dispatch, router, authMutate, postId, projectWriter, projectDetail]);

  const handleJoinProject = useCallback(async () => {
    const result = confirm('프로젝트에 참가하시겠습니까?');

    if (!result) {
      return;
    }

    try {
      dispatch(fullScreenLoading(true));

      const auth = await authMutate();

      if (!auth?.success) {
        router.push('/signin');
      }

      if (auth?.success) {
        await createProjectJoinRequestAPI({ postId });
        alert(
          '참가 신청을 했습니다. 프로젝트 장이 승인 후 프로젝트 멤버가 됩니다.',
        );
      }

      dispatch(fullScreenLoading(false));
    } catch (error) {
      dispatch(fullScreenLoading(false));
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
      dispatch(fullScreenLoading(true));

      const auth = await authMutate();

      if (auth?.success) {
        await deleteProjectMemberAPI({ postId });

        projectDetailMutate();

        alert('프로젝트를 탈퇴 했습니다.');
      }

      if (!auth?.success) {
        router.push('/signin');
      }

      dispatch(fullScreenLoading(false));
    } catch (error) {
      dispatch(fullScreenLoading(false));
      errorMessage(error);
    }
  }, [dispatch, authMutate, projectDetailMutate, postId, router]);

  const handleCheckMember = useCallback(
    (projectWriter?: ProjectWriter, projectMembers?: ProjectMember[]) => {
      const founded = projectMembers?.find(
        (profile) => profile.nickname === user?.nickname,
      );

      const isMyPost = projectWriter?.nickname === user?.nickname;

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
    (projectDetail?: ProjectDetail, projectMembers?: ProjectMember[]) => {
      const members = projectMembers?.length;
      if (typeof members !== 'number') {
        return false;
      }

      return projectDetail?.recruitCount === members - 1;
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
    isMyPost: projectWriter?.nickname === user?.nickname,
    isRecruitCompleted: handleCheckRecruitComplete(
      projectDetail,
      projectMembers,
    ),
    isMember: handleCheckMember(projectWriter, projectMembers),
    isClientRendering,
    writer: projectWriter
      ? {
          nickname: projectWriter.nickname,
          lastSigninAt: dateFromNow({
            date: projectWriter.lastSigninAt,
          }),
          profileImage: projectWriter.profileImage,
        }
      : projectWriter,
    content: projectDetail
      ? {
          id: projectDetail.id,
          title: projectDetail.title,
          contentHTML: projectDetail.contentHTML,
          contentMarkdown: projectDetail.contentMarkdown,
          views: projectDetail.views,
          createdAt: changeDateFormat({
            date: projectDetail.createdAt,
            format: 'YYMMDD_hhmm',
          }),
          updatedAt: changeDateFormat({
            date: projectDetail.updatedAt,
            format: 'YYMMDD_hhmm',
          }),
          hashtags: projectDetail.hashtags,
          memberTypes: handleConvertMemberTypes(projectDetail.memberTypes),
          recruitCount: projectDetail.recruitCount,
          representativeImage: projectDetail.representativeImage,
        }
      : projectDetail,
    members: projectMembers,
    bookmarkStatus,
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
