import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from 'store';
import useNoSpaceInput from '@/hooks/useNoSpaceInput';
import EmailAuthView, { EmailAuthViewProps } from './EmailAuthView';
import { emailAuth } from '@/features/signUp';
import { signUpAPI, SignUpAPIReq } from '@/apis/signUp';
import useTimer from '@/hooks/useTimer';
import { errorMessage } from '@/apis/errorMessage';
import { emailVerifyAPI } from '@/apis/emailVerify';
import { loading } from '@/features/loading';

const EmailAuthController = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isLoading = useSelector((state: RootState) => state.isLoading.status);
  const email = useSelector((state: RootState) => state.signUp.email);
  const password = useSelector((state: RootState) => state.signUp.password);

  const [authCode, handleChangeAuthCode] = useNoSpaceInput('');

  const { timer, leftMinutes, leftSeconds } = useTimer({
    minutes: 3,
    seconds: 0,
  });

  const authCodeInputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!email || !password) {
        return;
      }

      const isTimerEnd = leftMinutes + leftSeconds === 0;

      if (isTimerEnd) {
        return alert('인증시간이 만료되었습니다.');
      }

      if (!authCode) {
        return alert('인증번호를 입력해주세요.');
      }

      if (isLoading) {
        return;
      }

      try {
        authCodeInputRef.current?.blur();

        dispatch(loading({ status: true }));

        await emailVerifyAPI({ email, authCode });

        const data: SignUpAPIReq = { email, password, signUpType: 'email' };

        await signUpAPI(data);

        alert('회원가입 완료. 환영합니다 🎉');

        router.replace('/');

        router.events.on('routeChangeComplete', () => {
          dispatch(loading({ status: false }));
        });
      } catch (error) {
        dispatch(loading({ status: false }));
        errorMessage(error);
        authCodeInputRef.current?.focus();
      }
    },

    [
      authCode,
      email,
      password,
      router,
      leftMinutes,
      leftSeconds,
      dispatch,
      isLoading,
    ],
  );

  // Initialize input information when going back
  useEffect(() => {
    return () => {
      const data = { email: '', password: '' };
      dispatch(emailAuth(data));
    };
  }, [dispatch, email, password]);

  // Function for allow and disallow submit button
  const checkTimerLeftTime = useCallback(() => {
    if (email && password) {
      const isTimerEnd = leftMinutes + leftSeconds === 0;

      if (isTimerEnd) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }, [email, password, leftMinutes, leftSeconds]);

  // If the page is accessed in a way other than moving from the signUp page to the current page
  useEffect(() => {
    if (!email || !password) {
      const data = { email: '', password: '' };

      dispatch(emailAuth(data));

      alert('비정상적인 접근입니다.');

      router.back();
    }
  }, [email, password, dispatch, router]);

  const props: EmailAuthViewProps = {
    handleClose,
    authCode,
    handleChangeAuthCode,
    handleSubmit,
    timer: email && password ? timer : '00:00',
    isTimerLeft: checkTimerLeftTime(),
    authCodeInputRef,
  };
  return <EmailAuthView {...props} />;
};

export default EmailAuthController;
