import React, { useCallback, useEffect, useState } from 'react';
import ProfileInfoView, { ProfileInfoViewProps } from './ProfileInfoView';
import {
  ProfileInfoAPIRes,
  profileInfoFetcher,
} from '@/apis/profileInfoFetcher';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { profileInfoKey } from '@/apis/keys';
import { errorMessage } from '@/apis/errorMessage';
import { serialize } from '@/middleware/swr/serialize';
import { changeDateFormat } from '@/utils/changeDateFormat';
import { useSelector } from 'react-redux';
import { open as openDialog, close as closeDialog } from '@/features/dialog';
import { RootState, useAppDispatch } from '@/store';
import { updateProfileAPI } from '@/apis/updateProfile';
import useAuth from '@/hooks/useAuth';
import useCachedKeys from '@/hooks/useCachedKeys';
import { ProfileTab } from '@/models/profile/ProfileController';
import { updateSwipeableViewHeight } from '@/features/swipeableView';
import useWindowSize from '@/hooks/useWindowSize';

interface ProfileInfoData {
  isLoaded: boolean;
  data: ProfileInfoAPIRes['data'] | null;
}

export interface ProfileInfoControllerProps {
  currentTab: ProfileTab;
  isExistUser?: boolean;
  nickname: string;
}

const ProfileInfoController = ({
  currentTab,
  isExistUser,
  nickname,
}: ProfileInfoControllerProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { nickname: accessUser, authMutate } = useAuth();
  const { getCachedData } = useCachedKeys();
  const { isLaptop } = useWindowSize();

  const updatePage = useSelector((state: RootState) => state.dialog.page);
  const updateCategory = useSelector(
    (state: RootState) => state.dialog.update?.category,
  );
  const updateNewValue = useSelector(
    (state: RootState) => state.dialog.update?.newValue,
  );

  const [data, setData] = useState<ProfileInfoData>({
    isLoaded: false,
    data: null,
  });

  const { data: profileInfoData, mutate: profileInfoDataMutate } = useSWR(
    isExistUser && currentTab === 'viewProfile' && nickname
      ? {
          url: profileInfoKey(nickname),
          args: {
            page: '/profile',
            tag: `profileInfo/${nickname}`,
          },
        }
      : null,
    profileInfoFetcher,
    {
      dedupingInterval: 1000 * 60 * 10,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError(err, key, config) {
        router.replace('/');
        errorMessage(err);
      },
      onSuccess(res, key, config) {
        setData({ isLoaded: true, data: res?.data });
      },
      use: [serialize],
    },
  );

  const handleUpdateProfile = useCallback(async () => {
    // empty string('') value can come from updateNewValue. so write null and undefined explicitly
    if (updateNewValue === null || updateNewValue === undefined) {
      return;
    }

    try {
      if (updateCategory === 'nickname') {
        const response = await updateProfileAPI({
          category: 'nickname',
          data: updateNewValue,
        });

        const nickname = response?.data.nickname;

        if (nickname) {
          router.replace(`/profile/${nickname}?tab=viewProfile`);
        }

        // If revalidate immediately. It will make an api request with the previous nickname value, resulting in an error. It should be handled asynchronously.
        setTimeout(() => {
          authMutate();
          profileInfoDataMutate();
        }, 100);

        return dispatch(closeDialog());
      }

      if (
        updateCategory === 'introduce' ||
        updateCategory === 'onOffline' ||
        updateCategory === 'place' ||
        updateCategory === 'contactTime' ||
        updateCategory === 'interests' ||
        updateCategory === 'career' ||
        updateCategory === 'skills'
      ) {
        await updateProfileAPI({
          category: updateCategory,
          data: updateNewValue,
        });

        profileInfoDataMutate();

        return dispatch(closeDialog());
      }
    } catch (error) {
      errorMessage(error);
    }
  }, [
    dispatch,
    router,
    updateCategory,
    updateNewValue,
    authMutate,
    profileInfoDataMutate,
  ]);

  const handleProfileInfoDataResponse = useCallback(
    (data: ProfileInfoAPIRes['data'] | null) => {
      if (!data) {
        return null;
      }

      // login user data
      if ('email' in data) {
        return {
          ...data,
          createdAt: changeDateFormat({
            date: data.createdAt,
            format: 'YYMMDD_hhmmss',
          }),
          lastLoginAt: changeDateFormat({
            date: data.lastLoginAt,
            format: 'YYMMDD_hhmmss',
          }),
          skills: data.skills ? [...data.skills.split(',')] : [],
        };
      }

      // not login user data
      return {
        ...data,
        createdAt: changeDateFormat({
          date: data.createdAt,
          format: 'YYMMDD',
        }),
        lastLoginAt: changeDateFormat({
          date: data.lastLoginAt,
          format: 'YYMMDD_hhmmss',
        }),
        skills: data.skills ? [...data.skills.split(',')] : [],
      };
    },
    [],
  );

  const handleProfileInfoEditBtn = useCallback(
    (category: string) => {
      if (!(profileInfoData?.data && 'email' in profileInfoData.data)) {
        return;
      }

      switch (category) {
        case 'nickname':
          dispatch(
            openDialog({
              page: 'profile',
              type: 'standard',
              category: 'nickname',
              title: '닉네임',
              value: profileInfoData?.data?.nickname ?? '',
              // placeholder: '',
              maxLength: 20,
            }),
          );
          break;
        case 'introduce':
          dispatch(
            openDialog({
              page: 'profile',
              type: 'multiline',
              category: 'introduce',
              title: '자기소개',
              value: profileInfoData?.data?.introduce ?? '',
              maxLength: 1000,
            }),
          );
          break;
        case 'onOffline':
          dispatch(
            openDialog({
              page: 'profile',
              type: 'select',
              category: 'onOffline',
              title: '온/오프라인',
              value: profileInfoData?.data?.onOffline ?? '',
              selectList: [
                '온라인 가능',
                '오프라인 가능',
                '온,오프라인 모두 가능',
              ],
            }),
          );
          break;
        case 'place':
          dispatch(
            openDialog({
              page: 'profile',
              type: 'standard',
              category: 'place',
              title: '모임장소',
              value: profileInfoData?.data?.place ?? '',
              placeholder: 'ex) 서울특별시 종로구, 상관없음',
              maxLength: 30,
            }),
          );
          break;
        case 'contactTime':
          dispatch(
            openDialog({
              page: 'profile',
              type: 'standard',
              category: 'contactTime',
              title: '모임시간',
              value: profileInfoData?.data?.contactTime ?? '',
              placeholder: 'ex) 평일 9시~18시, 화요일 20시 이후',
              maxLength: 30,
            }),
          );
          break;
        case 'interests':
          dispatch(
            openDialog({
              page: 'profile',
              type: 'multiSelect',
              category: 'interests',
              title: '관심분야 (다중선택가능)',
              value: profileInfoData?.data?.interests ?? '',
              selectList: [
                '인공지능',
                '가상현실(VR)',
                '증강현실(AR)',
                'O2O',
                '공유서비스',
                '데이팅서비스',
                '여행',
                '소셜네트워크',
                '뷰티/패션',
                '이커머스',
                '엔터테인먼트',
                '게임',
                '헬스/스포츠',
                '뉴스/정보',
                '유틸',
                '금융',
                '부동산/인테리어',
                '종교',
                '교육',
                '의료/병원',
                '모빌리티',
                '육아/출산',
                '사물인터넷',
                '블록체인',
              ],
            }),
          );
          break;
        case 'career':
          dispatch(
            openDialog({
              page: 'profile',
              type: 'standard',
              category: 'career',
              title: '경력사항',
              value: profileInfoData?.data?.career ?? '',
              placeholder: 'ex) 3년차 개발자, 1년차 디자이너, 학생',
              maxLength: 30,
            }),
          );
          break;
        case 'skills':
          dispatch(
            openDialog({
              page: 'profile',
              type: 'hashtag',
              category: 'skills',
              title: '사용 프로그램 또는 기술',
              value: profileInfoData?.data?.skills ?? '',
              maxLength: 30,
            }),
          );
          break;

        default:
          break;
      }
    },
    [dispatch, profileInfoData],
  );

  const handleDeleteAccount = useCallback(async () => {
    const result = confirm('서비스를 탈퇴 하시겠습니까?');

    if (!result) {
      return;
    }

    router.push('/deleteAccount');
  }, [router]);

  useEffect(() => {
    if (updatePage !== 'profile') {
      return;
    }

    if (updatePage === 'profile' && updateCategory) {
      handleUpdateProfile();
    }
  }, [updatePage, updateCategory, handleUpdateProfile]);

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

    const profileInfoCachedData = getCachedData({
      tag: `profileInfo/${nickname}`,
    }) as ProfileInfoAPIRes['data'];

    if (!data.isLoaded && profileInfoCachedData) {
      setData({
        isLoaded: true,
        data: profileInfoCachedData,
      });
    }
  }, [dispatch, data, profileInfoData, nickname, getCachedData]);

  const props: ProfileInfoViewProps = {
    me: nickname === accessUser,
    data: handleProfileInfoDataResponse(data.data),
    editBtnHandler: handleProfileInfoEditBtn,
    handleDeleteAccount,
  };

  return <ProfileInfoView {...props} />;
};

export default ProfileInfoController;
