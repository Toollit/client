import React, { FC, useCallback, useEffect, useState } from 'react';
import ProfileInfoView, { ViewProps } from './UserInfoView';
import { ProfileInfoAPIRes } from '@/apis/profileInfoFetcher';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';
import { changeDateFormat } from '@/utils/changeDateFormat';
import { open as openDialog, close as closeDialog } from '@/features/dialog';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateProfileAPI } from '@/apis/updateProfile';
import useAuth from '@/hooks/useAuth';
import { updateSwipeableViewHeight } from '@/features/swipeableView';
import useWindowSize from '@/hooks/useWindowSize';
import useUserRegisteredCheckSWR from '@/hooks/useSWR/useUserRegisteredCheckSWR';
import useUserInfoSWR from '@/hooks/useSWR/useUserInfoSWR';

interface ControllerProps {}

const UserInfoController: FC<ControllerProps> = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, authMutate } = useAuth();
  const { isLaptop } = useWindowSize();

  const updatePage = useAppSelector((state) => state.dialog.page);
  const updateCategory = useAppSelector(
    (state) => state.dialog.update?.category,
  );
  const updateNewValue = useAppSelector(
    (state) => state.dialog.update?.newValue,
  );

  const [nickname, setNickname] = useState('');

  const { isRegisteredUser } = useUserRegisteredCheckSWR(nickname);
  const { userInfo, isLoading, userInfoMutate } = useUserInfoSWR(nickname);

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
          userInfoMutate();
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

        userInfoMutate();

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
    userInfoMutate,
  ]);

  const handleProcessUserInfo = useCallback(
    (data: ProfileInfoAPIRes['data']) => {
      if (!data) {
        return;
      }

      // signin user data
      if ('email' in data) {
        return {
          ...data,
          createdAt: changeDateFormat({
            date: data.createdAt,
            format: 'YYMMDD_hhmmss',
          }),
          lastSigninAt: changeDateFormat({
            date: data.lastSigninAt,
            format: 'YYMMDD_hhmmss',
          }),
          skills: data.skills ? [...data.skills.split(',')] : [],
        };
      }

      // not signin user data
      return {
        ...data,
        createdAt: changeDateFormat({
          date: data.createdAt,
          format: 'YYMMDD',
        }),
        lastSigninAt: changeDateFormat({
          date: data.lastSigninAt,
          format: 'YYMMDD_hhmmss',
        }),
        skills: data.skills ? [...data.skills.split(',')] : [],
      };
    },
    [],
  );

  const handleProfileInfoEditBtn = useCallback(
    (category: string) => {
      if (!(userInfo && 'email' in userInfo)) {
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
              value: userInfo?.nickname ?? '',
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
              value: userInfo?.introduce ?? '',
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
              value: userInfo?.onOffline ?? '',
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
              value: userInfo?.place ?? '',
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
              value: userInfo?.contactTime ?? '',
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
              value: userInfo?.interests ?? '',
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
              value: userInfo?.career ?? '',
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
              value: userInfo?.skills ?? '',
              maxLength: 30,
            }),
          );
          break;

        default:
          break;
      }
    },
    [dispatch, userInfo],
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
  }, [dispatch, isLaptop]);

  useEffect(() => {
    const nickname = router.query.nickname;

    if (typeof nickname === 'string' && nickname) {
      setNickname(nickname);
    }
  }, [router, dispatch]);

  const props: ViewProps = {
    isLoading,
    isMyProfile: nickname === user?.nickname,
    data: handleProcessUserInfo(userInfo),
    editBtnHandler: handleProfileInfoEditBtn,
    handleDeleteAccount,
  };

  return <ProfileInfoView {...props} />;
};

export default UserInfoController;
