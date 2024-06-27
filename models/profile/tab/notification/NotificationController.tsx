import React, { FC, useCallback, useEffect, useState } from 'react';
import NotificationView, { ViewProps } from './NotificationView';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';
import { Notification } from '@/apis/profileNotificationsFetcher';
import { dateFromNow } from '@/utils/changeDateFormat';
import { updateSwipeableViewHeight } from '@/features/swipeableView';
import { useAppDispatch } from '@/store';
import useWindowSize from '@/hooks/useWindowSize';
import { projectJoinApproveAPI } from '@/apis/projectJoinApprove';
import { projectJoinRejectAPI } from '@/apis/projectJoinReject';
import { profileNotificationDeleteAPI } from '@/apis/profileNotificationDelete';
import useAuth from '@/hooks/useAuth';
import useMyNotificationsSWR from '@/hooks/useSWR/useMyNotificationsSWR';

interface ControllerProps {}

const NotificationController: FC<ControllerProps> = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLaptop } = useWindowSize();
  const { user } = useAuth();

  const [nickname, setNickname] = useState('');
  const { notifications, notificationsMutate } = useMyNotificationsSWR(
    nickname === user?.nickname,
    nickname,
  );

  const handleDeleteNotification = useCallback(
    async (notificationId: number) => {
      const result = confirm(
        '알림을 삭제하시겠습니까? 삭제 후 알림 복원이 불가능합니다.',
      );

      if (result) {
        try {
          await profileNotificationDeleteAPI({ notificationId });

          notificationsMutate();
        } catch (error) {
          errorMessage(error);
        }
      }
    },
    [notificationsMutate],
  );

  const handleProcessedData = useCallback((notifications?: Notification[]) => {
    if (!notifications) {
      return;
    }
    const convertedData = notifications.map((notification) => {
      const notificationInfo = () => {
        switch (notification.type) {
          case 'projectJoinRequest':
            return '프로젝트 참가 신청이 도착했어요!';
          case 'projectJoinApprove':
            return '프로젝트 참가 신청이 승인됐어요!';
          case 'projectJoinReject':
            return '프로젝트 참가 신청이 거절됐어요!';
          case 'projectLeave':
            return '프로젝트에서 탈퇴했어요!';
          default:
            break;
        }
      };

      return {
        ...notification,
        notificationInfo: notificationInfo(),
        nickname: notification.notificationCreator ?? '',
        createdAt: dateFromNow({ date: notification.createdAt }),
      };
    });

    return convertedData;
  }, []);

  const handleProjectJoinApprove = useCallback(
    async (notificationId: number) => {
      const result = confirm('정말 수락하시겠습니까?');

      if (!result) {
        return;
      }

      try {
        await projectJoinApproveAPI({ notificationId });

        alert('프로젝트 멤버로 추가되었습니다.');

        notificationsMutate();
      } catch (error) {
        errorMessage(error, notificationsMutate);
      }
    },
    [notificationsMutate],
  );

  const handleProjectJoinReject = useCallback(
    async (notificationId: number) => {
      const result = confirm('정말 거절하시겠습니까?');

      if (!result) {
        return;
      }

      try {
        await projectJoinRejectAPI({ notificationId });

        alert('프로젝트 참여 요청을 거절했습니다.');

        notificationsMutate();
      } catch (error) {
        errorMessage(error, notificationsMutate);
      }
    },
    [notificationsMutate],
  );

  const each = useCallback(
    (data: Notification) => ({
      handleProjectJoinApprove: () => handleProjectJoinApprove(data.id),
      handleProjectJoinReject: () => handleProjectJoinReject(data.id),
      handleDeleteNotification: () => handleDeleteNotification(data.id),
    }),
    [
      handleProjectJoinApprove,
      handleProjectJoinReject,
      handleDeleteNotification,
    ],
  );

  // The reason data is write in the dependencies is to adjust the screen size when the data is updated.
  // Works only in non-desktop versions
  useEffect(() => {
    if (isLaptop !== null && !isLaptop) {
      dispatch(updateSwipeableViewHeight(true));
    }
  }, [dispatch, isLaptop]);

  useEffect(() => {
    const nickname = router.query.nickname;

    if (typeof nickname === 'string' && nickname) {
      setNickname(nickname);
    }
  }, [router, dispatch]);

  const props: ViewProps = {
    data: handleProcessedData(notifications),
    each,
    isMyProfile: nickname === user?.nickname,
  };

  return <NotificationView {...props} />;
};

export default NotificationController;
