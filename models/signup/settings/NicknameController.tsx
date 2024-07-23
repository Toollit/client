import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import NicknameView, { ViewProps } from './NicknameView';
import { useRouter } from 'next/router';
import { loading } from '@/features/loading';
import { errorMessage } from '@/apis/config/errorMessage';
import { useAppDispatch, useAppSelector } from '@/store';
import { TduplicateNicknameCheckAPI } from '@/apis/duplicateNicknameCheck';
import { updateSettingsNicknameAPI } from '@/apis/updateSettingsNickname';
import useAuth from '@/hooks/useAuth';
import useLogout from '@/hooks/useLogout';

export interface ControllerProps {}

const NicknameController: FC<ControllerProps> = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, authMutate } = useAuth();
  const { logout } = useLogout();

  const isLoading = useAppSelector((state) => state.isLoading.status);

  const [nickname, setNickname] = useState('');

  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(async () => {
    const result = confirm(
      '회원가입이 완료되었습니다.\n닉네임 설정을 완료해야 서비스 이용이 가능합니다.\n정말로 나가시겠습니까?',
    );

    if (!result) {
      return;
    }

    if (isAuthenticated) {
      try {
        await logout({ replace: '/signin' });
      } catch (error) {
        errorMessage(error);
      }
    } else {
      router.replace('/signup');
    }
  }, [router, isAuthenticated, logout]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (isAuthenticated === false) {
        alert('비정상적인 접근입니다.');
        return router.replace('/signin');
      }

      const onlyNoSpaceEnglishNumber = /^[a-zA-Z0-9]+$/;

      const isOnlyNoSpaceEnglishNumber =
        onlyNoSpaceEnglishNumber.test(nickname);

      if (!isOnlyNoSpaceEnglishNumber) {
        return alert('닉네임은 공백 없이 영어, 숫자 조합으로만 가능합니다.');
      }

      if (nickname.length < 2 || nickname.length > 20) {
        return alert('닉네임은 2자 이상 20자 이하까지 가능합니다.');
      }

      if (isLoading) {
        return;
      }

      try {
        nicknameInputRef.current?.blur();

        dispatch(loading({ status: true }));

        await TduplicateNicknameCheckAPI({ nickname });

        await updateSettingsNicknameAPI({ nickname });
        // revalidate user info for update nickname
        await authMutate();

        alert(`닉네임 설정 완료. ${nickname}님 환영합니다 🎉`);

        router.replace('/');

        router.events.on('routeChangeComplete', () => {
          dispatch(loading({ status: false }));
        });
      } catch (error) {
        dispatch(loading({ status: false }));
        errorMessage(error);
        nicknameInputRef.current?.focus();
      }
    },
    [dispatch, router, nickname, isLoading, isAuthenticated, authMutate],
  );

  const handleNickname = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;

      setNickname(value);
    },
    [],
  );

  // Check sign up process access when accessing and reloading the current page
  useEffect(() => {
    if (isAuthenticated === false) {
      alert('비정상적인 접근입니다.');

      router.replace('/signin');
    }
  }, [dispatch, router, isAuthenticated]);

  const props: ViewProps = {
    handleClose,
    handleSubmit,
    nickname,
    handleNickname,
    nicknameInputRef,
  };

  return <NicknameView {...props} />;
};

export default NicknameController;
