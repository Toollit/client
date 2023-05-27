import React, { useCallback, useEffect, useState } from 'react';
import ProfileView, { ProfileViewProps } from './ProfileView';
import useSWR from 'swr';
import { AUTH_USER, GET_USER_PROFILE_API_ENDPOINT } from '@/apis/keys';
import { User, profileFetcher } from '@/apis/profileFetcher';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';
import { logoutAPI } from '@/apis/logout';
import useWindowSize from '@/hooks/useWindowSize';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateProfileAPI } from '@/apis/updateProfile';
import { authFetcher } from '@/apis/authFetcher';
import { changeDateFormat } from '@/utils/changeDateFormat';
import {
  open as openDialog,
  close as closeDialog,
  updateValue,
} from '@/features/dialog';

const ProfileController = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLaptop } = useWindowSize();

  const newValue = useSelector((state: RootState) => state.dialog.newValue);

  const [dialogEditCategory, setDialogEditCategory] = useState('');
  const [profileNickname, setProfileNickname] = useState('');
  const [isLoadedData, setIsLoadedData] = useState({
    viewProfile: false,
    viewProjects: false,
    viewBookmarks: false,
  });
  const [tabs] = useState([
    { name: '내프로필', query: 'viewProfile' },
    { name: '프로젝트', query: 'viewProjects' },
    { name: '북마크', query: 'viewBookmarks' },
  ]);

  const nickname = router.query.nickname;
  const currentTab = router.query.tab as
    | 'viewProfile'
    | 'viewProjects'
    | 'viewBookmarks'
    | undefined;

  const { data: user, mutate: userMutate } = useSWR(AUTH_USER, authFetcher);

  const { data, mutate: profileMutate } = useSWR(
    nickname && currentTab
      ? `${GET_USER_PROFILE_API_ENDPOINT}/${nickname}?tab=${currentTab}`
      : null,
    profileFetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError(err, key, config) {
        errorMessage(err);
        router.replace('/');
      },
      onSuccess(data, key, config) {
        if (typeof currentTab !== 'undefined') {
          setIsLoadedData((prev) => {
            return {
              ...prev,
              [currentTab]: true,
            };
          });
        }
      },
    },
  );

  const handleLogInOut = useCallback(async () => {
    const isLoggedIn = user?.data?.nickname;

    if (isLoggedIn) {
      try {
        const response = await logoutAPI();

        if (response?.success) {
          userMutate();
          router.push('/');
        }
      } catch (error) {
        errorMessage(error);
      }
    } else {
      router.push('/login');
    }
  }, [router, user, userMutate]);

  const handleEdit = useCallback(
    (event: React.MouseEvent) => {
      const title = event.currentTarget.getAttribute('data-edit-title');
      const value = event.currentTarget.getAttribute('data-edit-value');
      const editType = event.currentTarget.getAttribute('data-edit-type');
      const editCategory =
        event.currentTarget.getAttribute('data-edit-category');

      console.log('handleEdit ===>', { title, value, editType, editCategory });

      if (
        title === null ||
        value === null ||
        editType === null ||
        editCategory === null
      ) {
        return;
      }

      if (
        !(
          editType === 'standard' ||
          editType == 'multiline' ||
          editType == 'select'
        )
      ) {
        return;
      }

      if (editType === 'standard') {
        setDialogEditCategory(editCategory);
        return dispatch(
          openDialog({
            type: editType,
            open: true,
            title,
            value,
          }),
        );
      }

      if (editType === 'multiline') {
        setDialogEditCategory(editCategory);
        return dispatch(
          openDialog({
            type: editType,
            open: true,
            title,
            value,
            maxLength: 1000,
          }),
        );
      }
    },
    [dispatch],
  );

  // 페이지 첫 로드시 query 조건이 없는 경우 tab 설정을 하기 위한 useEffect
  useEffect(() => {
    // default tab settings
    if (nickname && currentTab === undefined) {
      router.replace({
        pathname: `/profile/${nickname}`,
        query: { tab: 'viewProfile' },
      });
    }
  }, [currentTab, nickname, router]);

  // 새로고침시 탭 이동시 nickname이 undefined되는 문제 해결을 위한 useEffect
  useEffect(() => {
    if (nickname !== undefined && typeof nickname === 'string') {
      setProfileNickname(nickname);
    }
  }, [nickname]);

  useEffect(() => {
    if (newValue !== '') {
      (async () => {
        if (dialogEditCategory === 'nickname') {
          const response = await updateProfileAPI({
            editCategory: dialogEditCategory,
            data: newValue,
          });

          userMutate();

          const nickname = response?.data.nickname;

          if (nickname) {
            router.replace(`/profile/${nickname}?tab=viewProfile`);
          }

          setDialogEditCategory('');
          dispatch(updateValue({ newValue: '' }));
          dispatch(closeDialog());
          return;
        }

        if (dialogEditCategory === 'introduce') {
          if (newValue.length > 1000) {
            return alert('자기소개는 1000자 이하여야 합니다.');
          }

          await updateProfileAPI({
            editCategory: dialogEditCategory,
            data: newValue,
          });

          profileMutate();

          setDialogEditCategory('');
          dispatch(updateValue({ newValue: '' }));
          dispatch(closeDialog());
          return;
        }
      })();
    }
  }, [
    dispatch,
    router,
    newValue,
    dialogEditCategory,
    userMutate,
    profileMutate,
  ]);

  useEffect(() => {
    if (newValue) {
    }
  }, [newValue]);

  const props: ProfileViewProps = {
    me: nickname === user?.data?.nickname,
    loginState: user?.data?.nickname,
    tabs,
    currentTab,
    data: data?.data,
    profileNickname,
    // projects: data?.data.projects,
    handleLogInOut,
    isLaptop,
    isLoadedData,
    handleEdit,
  };

  return <ProfileView {...props} />;
};

export default ProfileController;
