import React, { useCallback, useEffect, useState } from 'react';
import ProfileView, { ProfileViewProps } from './ProfileView';
import useSWR from 'swr';
import { GET_USER_PROFILE_API_ENDPOINT } from '@/apis/keys';
import { profileFetcher } from '@/apis/profileFetcher';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';
import { logoutAPI } from '@/apis/logout';
import useWindowSize from '@/hooks/useWindowSize';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateProfileAPI } from '@/apis/updateProfile';

const ProfileController = () => {
  const router = useRouter();
  const { isLaptop } = useWindowSize();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogValue, setDialogValue] = useState('');
  const [dialogEditType, setDialogEditType] = useState<
    'standard' | 'multiline' | 'select'
  >('standard');
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

  const { data, mutate } = useSWR(
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

  const handleLogout = useCallback(async () => {
    try {
      const response = await logoutAPI();

      if (response?.success) {
        router.push('/');
      }
    } catch (error) {
      errorMessage(error);
    }
  }, [router]);

  const handleEdit = useCallback((event: React.MouseEvent) => {
    const title = event.currentTarget.getAttribute('data-edit-title');
    const value = event.currentTarget.getAttribute('data-edit-value');
    const editType = event.currentTarget.getAttribute('data-edit-type') as
      | 'standard'
      | 'multiline'
      | 'select';
    const editCategory = event.currentTarget.getAttribute('data-edit-category');

    if (!(title && value && editType && editCategory)) {
      return;
    }
    console.log({ title, value, editType, editCategory });

    setDialogTitle(title);
    setDialogEditType(editType);
    setDialogEditCategory(editCategory);
    setDialogOpen((prev) => {
      if (prev === true) {
        setDialogValue('');
      }
      if (prev === false) {
        setDialogValue(value);
      }
      return !prev;
    });
  }, []);

  const handleDialog = useCallback(
    async (event: React.MouseEvent) => {
      // 취소, 완료 버튼이 아닌 외부 클릭시 null
      const edit = event.currentTarget.getAttribute('data-edit') as
        | 'true'
        | 'false'
        | null;

      if (edit === 'true') {
        try {
          if (dialogEditCategory === 'nickname') {
            const response = await updateProfileAPI({
              editCategory: dialogEditCategory,
              data: dialogValue,
            });

            const nickname = response?.data.nickname;

            if (nickname) {
              router.replace(`/profile/${nickname}?tab=viewProfile`);
            }

            return setDialogOpen((prev) => !prev);
          }

          // if (dialogEditCategory === 'email') {
          //   router.push('/profile/emailAuth');
          //   return setDialogOpen((prev) => !prev);
          // }
        } catch (error) {
          errorMessage(error);
        }
      }

      if (edit === ('false' || null)) {
        setDialogOpen((prev) => !prev);
      }
    },
    [dialogEditCategory, dialogValue, router],
  );

  const handleDialogValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;

      setDialogValue(value);
    },
    [],
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

  const props: ProfileViewProps = {
    tabs,
    currentTab,
    data: data?.data,
    profileNickname,
    // projects: data?.data.projects,
    handleLogout,
    isLaptop,
    isLoadedData,
    handleEdit,
    dialogOpen,
    dialogTitle,
    dialogValue,
    handleDialogValue,
    handleDialog,
    dialogEditType,
  };

  return <ProfileView {...props} />;
};

export default ProfileController;
