import React, { useCallback, useEffect, useState } from 'react';
import AlarmView, { NotificationViewProps } from './AlarmView';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { profileNotificationsKey } from '@/apis/keys';
import { errorMessage } from '@/apis/errorMessage';
import { serialize } from '@/middleware/swr/serialize';
import {
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

interface NotificationData {
  isLoaded: boolean;
  data: ProfileNotificationsAPIRes['data'];
}

export interface NotificationControllerProps {
  currentTab: ProfileTab;
  isExistUser?: boolean;
  nickname: string;
}

const AlarmController = ({
  currentTab,
  isExistUser,
  nickname,
}: NotificationControllerProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { getCachedData } = useCachedKeys();
  const { isLaptop } = useWindowSize();

  const [data, setData] = useState<NotificationData>({
    isLoaded: false,
    data: { notifications: [], total: 0 },
  });

  const { data: profileAlarmsData } = useSWR(
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
        return {
          ...notification,
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
      try {
        await projectJoinApproveAPI({ notificationId });

        alert('프로젝트 멤버로 추가되었습니다.');
      } catch (error) {
        errorMessage(error);
      }
    },
    [],
  );

  const handleProjectJoinReject = useCallback(
    async (notificationId: number) => {
      try {
        await projectJoinRejectAPI({ notificationId });
      } catch (error) {
        errorMessage(error);
      }
    },
    [],
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

    const profileAlarmsCachedData = getCachedData({
      tag: 'profileNotifications',
    }) as ProfileNotificationsAPIRes['data'];

    if (!data.isLoaded && profileAlarmsCachedData) {
      setData({
        isLoaded: true,
        data: profileAlarmsCachedData,
      });
    }
  }, [dispatch, data, profileAlarmsData, nickname, getCachedData]);

  const props: NotificationViewProps = {
    data: handleProcessedData(data.data),
    each: (data) => ({
      // handleRemove: () => {},
      handleApprove: () => {
        const result = confirm('정말 수락하시겠습니까?');
        if (result) {
          handleProjectJoinApprove(data.id);
        }
      },
      handleReject: () => {
        const result = confirm('정말 거절하시겠습니까?');
        if (result) {
          handleProjectJoinReject(data.id);
        }
      },
    }),
  };

  return <AlarmView {...props} />;
};

export default AlarmController;
