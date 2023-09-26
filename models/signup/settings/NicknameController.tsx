import React, { useCallback, useEffect, useRef, useState } from 'react';
import NicknameView, { NicknameViewProps } from './NicknameView';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { loading } from '@/features/loading';
import { errorMessage } from '@/apis/errorMessage';
import { RootState } from '@/store';
import { emailAuth } from '@/features/signUp';
import { SignUpAPIReq, signUpAPI } from '@/apis/signUp';
import { DuplicateCheckNicknameAPI } from '@/apis/duplicateCheckNickname';
import { updateSocialLoginNicknameAPI } from '@/apis/updateSocialLoginNickname';
import useAuth from '@/hooks/useAuth';
import useLogout from '@/hooks/useLogout';

export interface NicknameControllerProps {}

const NicknameController = ({}: NicknameControllerProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, authMutate } = useAuth();
  const { logOut } = useLogout();

  const isLoading = useSelector((state: RootState) => state.isLoading.status);
  const email = useSelector((state: RootState) => state.signUp.email);
  const password = useSelector((state: RootState) => state.signUp.password);

  const [nickname, setNickname] = useState('');

  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(async () => {
    const result = confirm(
      '닉네임 설정을 완료해야 회원가입이 완료됩니다. 정말로 나가시겠습니까?',
    );

    if (!result) {
      return;
    }

    if (isAuthenticated) {
      try {
        await logOut({ replace: '/login' });
      } catch (error) {
        errorMessage(error);
      }
    } else {
      router.replace('/signUp');
    }
  }, [router, isAuthenticated, logOut]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (isAuthenticated === false) {
        if (!email || !password) {
          alert('비정상적인 접근입니다.');

          return router.replace('login');
        }
      }

      const onlyEnglishNumber = /^[a-zA-Z0-9]+$/;

      const isOnlyEnglishNumber = onlyEnglishNumber.test(nickname);

      if (!isOnlyEnglishNumber) {
        return alert('닉네임은 영어, 숫자 조합으로만 가능합니다.');
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

        await DuplicateCheckNicknameAPI({ nickname });

        // email signUp
        if (isAuthenticated === false) {
          const data: SignUpAPIReq = {
            email,
            password,
            signUpType: 'email',
            nickname,
          };

          try {
            await signUpAPI(data);
          } catch (error) {
            errorMessage(error);
          }
        }

        // social(google, github) signUp
        if (isAuthenticated === true) {
          try {
            await updateSocialLoginNicknameAPI({ nickname });
            // revalidate user info
            await authMutate();
          } catch (error) {
            errorMessage(error);
          }
        }

        alert('회원가입 완료. 환영합니다 🎉');

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
    [
      dispatch,
      router,
      email,
      password,
      nickname,
      isLoading,
      isAuthenticated,
      authMutate,
    ],
  );

  const handleNickname = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;

      setNickname(value);
    },
    [],
  );

  // Initialize input information when close nickname settings page
  useEffect(() => {
    return () => {
      const data = { email: '', password: '' };
      dispatch(emailAuth(data));
    };
  }, [dispatch, email, password]);

  // Check sign up process access when accessing and reloading the current page
  useEffect(() => {
    if (isAuthenticated === false) {
      if (!email || !password) {
        alert('비정상적인 접근입니다.');

        router.replace('/login');
      }
    }
  }, [email, password, dispatch, router, isAuthenticated]);

  const props: NicknameViewProps = {
    handleClose,
    handleSubmit,
    nickname,
    handleNickname,
    nicknameInputRef,
  };

  return <NicknameView {...props} />;
};

export default NicknameController;
