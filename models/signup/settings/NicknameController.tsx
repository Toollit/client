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

export interface NicknameControllerProps {}

const NicknameController = ({}: NicknameControllerProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isLoading = useSelector((state: RootState) => state.isLoading.status);
  const email = useSelector((state: RootState) => state.signUp.email);
  const password = useSelector((state: RootState) => state.signUp.password);

  const [nickname, setNickname] = useState('');

  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    router.replace('/login');
  }, [router]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!email || !password) {
        return;
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

        const response = await DuplicateCheckNicknameAPI({ nickname });

        if (response?.success) {
          const data: SignUpAPIReq = {
            email,
            password,
            signUpType: 'email',
            nickname,
          };

          await signUpAPI(data);

          alert('회원가입 완료. 환영합니다 🎉');

          router.replace('/');

          router.events.on('routeChangeComplete', () => {
            dispatch(loading({ status: false }));
          });
        }
      } catch (error) {
        dispatch(loading({ status: false }));
        errorMessage(error);
        nicknameInputRef.current?.focus();
      }
    },
    [dispatch, router, email, password, nickname, isLoading],
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

  // If the page is accessed in a way other than moving from the email auth page to the current page or refresh page
  useEffect(() => {
    if (!email || !password) {
      const data = { email: '', password: '' };
      dispatch(emailAuth(data));

      alert('비정상적인 접근입니다.');

      router.back();
    }
  }, [email, password, dispatch, router]);

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
