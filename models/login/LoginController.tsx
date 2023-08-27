import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginView, { LoginViewProps } from './LoginView';
import { emailLoginAPI } from '@/apis/emailLogin';
import { errorMessage } from '@/apis/errorMessage';
import PrivateRoute from '@/components/PrivateRoute';
import useCachedKeys from '@/hooks/useCachedKeys';

const LoginController = () => {
  const router = useRouter();
  const { clearCache } = useCachedKeys();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [fillFormComplete, setFillFormComplete] = useState(false);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    router.back();
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
        }, 100);
      }

      if (email && password) {
        const data = { email, password };
        try {
          const response = await emailLoginAPI(data);

          if (response?.success) {
            // All keys revalidate when logging in, logging out, because information may not be updated properly on certain pages
            clearCache();

            if (response.message === 'needResetPassword') {
              return router.replace('/resetPassword');
            } else {
              return router.replace('/');
            }
          }
        } catch (error) {
          errorMessage(error);
        }
      }
    },

    [email, password, router, clearCache],
  );

  const handleSocialLogin = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!event) return;

      const loginType = event.currentTarget.name as 'google' | 'github';

      const baseURL = process.env.NEXT_PUBLIC_SERVER_API_HOST;

      // All keys revalidate when logging in, logging out, because information may not be updated properly on certain pages
      clearCache();

      if (loginType === 'google') {
        return router.push(`${baseURL}/api/user/login/google`);
      }
      if (loginType === 'github') {
        return router.push(`${baseURL}/api/user/login/github`);
      }
    },
    [router, clearCache],
  );

  const handleEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const email = event.target.value;

      setEmail(email);
      setPassword('');
      setShowPasswordInput(false);
      setFillFormComplete(false);
    },
    [],
  );

  const handlePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const password = event.target.value;

      setPassword(password);

      if (password.length > 0) {
        setFillFormComplete(true);
      } else {
        setFillFormComplete(false);
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
      setTimeout(() => {
        alert('회원가입 완료. 환영합니다 🎉');
      }, 1000);
      router.replace('/');
    }
  }, [router]);

  const props: LoginViewProps = {
    handleClose,
    handleSubmit,
    email,
    handleEmail,
    password,
    handlePassword,
    passwordInputRef,
    showPasswordInput,
    fillFormComplete,
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
