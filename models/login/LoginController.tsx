import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginView, { LoginViewProps } from './LoginView';
import { emailLoginAPI } from '@/apis/emailLogin';
import { errorMessage } from '@/apis/errorMessage';
import PrivateRoute from '@/components/PrivateRoute';
import useCachedKeys from '@/hooks/useCachedKeys';
import { useDispatch, useSelector } from 'react-redux';
import { loading } from '@/features/loading';
import { RootState } from '@/store';
import { emailAuth } from '@/features/signUp';

const LoginController = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { clearCache } = useCachedKeys();

  const isLoading = useSelector((state: RootState) => state.isLoading.status);

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

        dispatch(loading({ status: true }));

        const data = { email, password };

        const response = await emailLoginAPI(data);

        // All keys revalidate when logging in, logging out, because information may not be updated properly on certain pages
        clearCache();

        if (response?.data.needResetPassword === true) {
          router.replace('/resetPassword');
        } else {
          router.replace('/');
        }

        router.events.on('routeChangeComplete', () => {
          dispatch(loading({ status: false }));
        });
      } catch (error) {
        dispatch(loading({ status: false }));
        errorMessage(error);
        passwordInputRef.current?.focus();
      }
    },

    [email, password, router, clearCache, dispatch, isLoading],
  );

  const handleSocialLogin = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!event) return;

      const loginType = event.currentTarget.name as 'google' | 'github';

      const baseURL = process.env.NEXT_PUBLIC_SERVER_API_HOST;

      // All keys revalidate when logging in, logging out, because information may not be updated properly on certain pages
      clearCache();

      if (loginType === 'google') {
        return window.location.replace(`${baseURL}/api/user/login/google`);
      }
      if (loginType === 'github') {
        return window.location.replace(`${baseURL}/api/user/login/github`);
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
      router.replace('/login');
    }

    if (duplicate === 'true') {
      alert('동일한 이메일로 가입된 사용자가 존재합니다.');
      router.replace('/login');
    }

    if (error === 'true') {
      alert('문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      router.replace('/login');
    }

    if (firstTime === 'true') {
      router.replace(`/signUp/settings/nickname`);
    }
  }, [router]);

  // Initialize email, password data when it comes to the current page from other pages
  useEffect(() => {
    const data = { email: '', password: '' };
    dispatch(emailAuth(data));
  }, [dispatch]);

  const props: LoginViewProps = {
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
    handleSocialLogin,
  };

  return (
    <PrivateRoute accessibleUser='unauthorized'>
      <LoginView {...props} />
    </PrivateRoute>
  );
};

export default LoginController;
