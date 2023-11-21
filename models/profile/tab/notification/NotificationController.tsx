import React, { useCallback, useEffect, useState } from 'react';
import NotificationView, { NotificationViewProps } from './NotificationView';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { profileNotificationsKey } from '@/apis/keys';
import { errorMessage } from '@/apis/errorMessage';
import { serialize } from '@/middleware/swr/serialize';
import {
  Notification,
  ProfileNotificationsAPIRes,
  profileNotificationsFetcher,
} from '@/apis/profileNotificationsFetcher';
import useCachedKeys from '@/hooks/useCachedKeys';
import { dateFromNow } from '@/utils/changeDateFormat';
import { ProfileTab } from '@/models/profile/ProfileController';
import { updateSwipeableViewHeight } from '@/features/swipeableView';
import { useAppDispatch } from '@/store';
import useWindowSize from '@/hooks/useWindowSize';
import { projectJoinApproveAPI } from '@/apis/projectJoinApprove';
import { projectJoinRejectAPI } from '@/apis/projectJoinReject';
import useTooltip from '@/hooks/useTooltip';

interface NotificationData {
  isLoaded: boolean;
  data: ProfileNotificationsAPIRes['data'];
}

export interface NotificationControllerProps {
  currentTab: ProfileTab;
  isExistUser?: boolean;
  nickname: string;
}

const NotificationController = ({
  currentTab,
  isExistUser,
  nickname,
}: NotificationControllerProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { getCachedData } = useCachedKeys();
  const { isLaptop } = useWindowSize();
  const {
    tooltipAnchorEl,
    setTooltipAnchorEl,
    tooltipOpen,
    handleTooltipOpen,
    handleTooltipClose,
  } = useTooltip();

  const [data, setData] = useState<NotificationData>({
    isLoaded: false,
    data: { notifications: [], total: 0 },
  });

  const { data: notificationsData, mutate: notificationsMutate } = useSWR(
    isExistUser && currentTab === 'viewNotifications' && nickname
      ? {
          url: profileNotificationsKey(nickname),
          args: {
            page: '/profile',
            tag: `profileNotifications`,
          },
        }
      : null,
    profileNotificationsFetcher,
    {
      dedupingInterval: 1000 * 60 * 10,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError(err, key, config) {
        errorMessage(err);
        router.back();
      },
      onSuccess(res, key, config) {
        setData({
          isLoaded: true,
          data: res?.data,
        });
      },
      use: [serialize],
    },
  );

  const handleProcessedData = useCallback(
    (data: ProfileNotificationsAPIRes['data']) => {
      const convertedData = data?.notifications.map((notification) => {
        const notificationInfo = () => {
          switch (notification.type) {
            case 'projectJoinRequest':
              return '프로젝트 참가 신청이 도착했어요!';
            case 'projectJoinApprove':
              return '프로젝트 참가 신청이 승인됐어요!';
            case 'projectJoinReject':
              return '프로젝트 참가 신청이 거절됐어요!';
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
    },
    [],
  );

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
        errorMessage(error);
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
        errorMessage(error);
      }
    },
    [notificationsMutate],
  );

  const each = useCallback(
    (data: Notification) => ({
      handleProjectJoinApprove: () => handleProjectJoinApprove(data.id),
      handleProjectJoinReject: () => handleProjectJoinReject(data.id),
    }),
    [handleProjectJoinApprove, handleProjectJoinReject],
  );

  // The reason data is write in the dependencies is to adjust the screen size when the data is updated.
  // Works only in non-desktop versions
  useEffect(() => {
    if (isLaptop !== null && !isLaptop) {
      dispatch(updateSwipeableViewHeight(true));
    }
  }, [data, dispatch, isLaptop]);

  // 프로필 페이지 특정 탭에 있다가 다른 페이지 다녀온 경우 캐싱 된 데이터가 존재하는 경우 state 업데이트
  useEffect(() => {
    if (!nickname) {
      return;
    }

    const profileNotificationsCachedData = getCachedData({
      tag: 'profileNotifications',
    }) as ProfileNotificationsAPIRes['data'];

    if (!data.isLoaded && profileNotificationsCachedData) {
      setData({
        isLoaded: true,
        data: profileNotificationsCachedData,
      });
    }
  }, [dispatch, data, notificationsData, nickname, getCachedData]);

  const props: NotificationViewProps = {
    data: handleProcessedData(data.data),
    each,
    tooltip: {
      items: [
        {
          text: '삭제',
          handler: () => console.log('삭제'),
        },
      ],
      anchorEl: tooltipAnchorEl,
      open: tooltipOpen,
      onClose: handleTooltipClose,
    },
    handleTooltipOpen,
  };

  return <NotificationView {...props} />;
};

export default NotificationController;
