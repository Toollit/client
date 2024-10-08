import React, { useCallback, useState, useRef, useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import SigninView, { ViewProps } from './SigninView';
import { emailSigninAPI } from '@/apis/auth/emailSignin';
import { errorMessage } from '@/apis/config/errorMessage';
import PrivateRoute from '@/components/PrivateRoute';
import useCachedKeys from '@/hooks/useCachedKeys';
import { fullScreenLoading } from '@/features/loading';
import { useAppDispatch, useAppSelector } from '@/store';
import { emailAuth } from '@/features/signup';

export interface ControllerProps {}

const SigninController: FC<ControllerProps> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { clearCache } = useCachedKeys();

  const isLoading = useAppSelector(
    (state) => state.loading.isFullScreenLoading,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!email) {
        return;
      }

      if (email) {
        setShowPasswordInput(true);
      }

      // Focus password input. Process asynchronously because the password input must be focused after it is displayed
      if (!password) {
        return setTimeout(() => {
          passwordInputRef.current?.focus();
        }, 1);
      }

      if (isLoading) {
        return;
      }

      if (!email || !password) {
        return;
      }

      try {
        passwordInputRef.current?.blur();

        dispatch(fullScreenLoading(true));

        const data = { email, password };

        const response = await emailSigninAPI(data);

        // All keys revalidate when logging in, logging out, because information may not be updated properly on certain pages
        clearCache();

        if (response?.data.needResetPassword === true) {
          router.replace('/resetPassword');
        } else {
          router.replace('/');
        }

        router.events.on('routeChangeComplete', () => {
          dispatch(fullScreenLoading(false));
        });
      } catch (error) {
        dispatch(fullScreenLoading(false));
        errorMessage(error);
        passwordInputRef.current?.focus();
      }
    },

    [email, password, router, clearCache, dispatch, isLoading],
  );

  const handleSocialSignin = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!event) return;

      const signinType = event.currentTarget.name as 'google' | 'github';

      const baseURL = process.env.NEXT_PUBLIC_SERVER_API_HOST;

      // All keys revalidate when logging in, logging out, because information may not be updated properly on certain pages
      clearCache();

      if (signinType === 'google') {
        return window.location.replace(`${baseURL}/api/user/signin/google`);
      }
      if (signinType === 'github') {
        return window.location.replace(`${baseURL}/api/user/signin/github`);
      }
    },
    [clearCache],
  );

  const handleEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const email = event.target.value;

      setEmail(email);
      setPassword('');
      setShowPasswordInput(false);
      setIsFormValid(false);
    },
    [],
  );

  const handlePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const password = event.target.value;

      setPassword(password);

      if (password.length > 0) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    },
    [],
  );

  const handlePwInquiryRouting = useCallback(() => {
    router.push('/pwInquiry');
  }, [router]);

  useEffect(() => {
    const { hasEmailInfo, duplicate, error, firstTime } = router.query;

    if (hasEmailInfo === 'false') {
      alert(
        '로그인한 계정에 이메일 정보가 없습니다. 이메일 정보를 등록해주세요.',
      );
      router.replace('/signin');
    }

    if (duplicate === 'true') {
      alert('동일한 이메일로 가입된 사용자가 존재합니다.');
      router.replace('/signin');
    }

    if (error === 'true') {
      alert('문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      router.replace('/signin');
    }

    if (firstTime === 'true') {
      router.replace(`/signup/nickname/initialize`);
    }
  }, [router]);

  // Initialize email, password data when it comes to the current page from other pages
  useEffect(() => {
    const data = { email: '', password: '' };
    dispatch(emailAuth(data));
  }, [dispatch]);

  const props: ViewProps = {
    handleClose,
    handleSubmit,
    email,
    handleEmail,
    password,
    handlePassword,
    passwordInputRef,
    showPasswordInput,
    isFormValid,
    handlePwInquiryRouting,
    handleSocialSignin,
  };

  return (
    <PrivateRoute accessibleUser='unauthorized'>
      <SigninView {...props} />
    </PrivateRoute>
  );
};

export default SigninController;
