import React, { useCallback, useEffect, useState } from 'react';
import AlarmView, { AlarmViewProps } from './AlarmView';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { profileAlarmsKey } from '@/apis/keys';
import { errorMessage } from '@/apis/errorMessage';
import { serialize } from '@/middleware/swr/serialize';
import {
  ProfileAlarmsAPIRes,
  profileAlarmsFetcher,
} from '@/apis/profileAlarmsFetcher';
import useCachedKeys from '@/hooks/useCachedKeys';
import { dateFromNow } from '@/utils/changeDateFormat';
import { ProfileCurrentTab } from '@/models/profile/ProfileController';
import { updateSwipeableViewHeight } from '@/features/swipeableView';
import { useAppDispatch } from '@/store';
import useWindowSize from '@/hooks/useWindowSize';

interface AlarmData {
  isLoaded: boolean;
  data: ProfileAlarmsAPIRes['data'] | null;
}

export interface AlarmControllerProps {
  currentTab: ProfileCurrentTab;
  isExistUser?: boolean;
  nickname: string;
}

const AlarmController = ({
  currentTab,
  isExistUser,
  nickname,
}: AlarmControllerProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { getCachedData } = useCachedKeys();
  const { isLaptop } = useWindowSize();

  const [data, setData] = useState<AlarmData>({ isLoaded: false, data: null });

  const { data: profileAlarmsData } = useSWR(
    isExistUser && currentTab === 'viewAlarms' && nickname
      ? {
          url: profileAlarmsKey(nickname),
          args: {
            page: '/profile',
            tag: `profileAlarms`,
          },
        }
      : null,
    profileAlarmsFetcher,
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
          data: res?.data
            ? {
                alarms: res.data.alarms,
              }
            : null,
        });
      },
      use: [serialize],
    },
  );

  const handleAlarmDataResponse = useCallback(
    (data: ProfileAlarmsAPIRes['data'] | null) => {
      if (!data) {
        return null;
      }

      const convertedData = data?.alarms.map((alarm) => {
        return {
          ...alarm,
          project: {
            ...alarm.project,
            createdAt: dateFromNow({ date: alarm.project.createdAt }),
          },
        };
      });

      return {
        alarms: convertedData,
      };
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
      tag: 'profileAlarms',
    }) as ProfileAlarmsAPIRes['data'];

    if (!data.isLoaded && profileAlarmsCachedData) {
      setData({
        isLoaded: true,
        data: profileAlarmsCachedData,
      });
    }
  }, [dispatch, data, profileAlarmsData, nickname, getCachedData]);

  const props: AlarmViewProps = {
    data: handleAlarmDataResponse(data.data),
  };

  return <AlarmView {...props} />;
};

export default AlarmController;
