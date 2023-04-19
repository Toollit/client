import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import LoginView, { LoginViewProps } from './LoginView';
import { emailLoginAPI } from '@/apis/emailLogin';
import { errorMessage } from '@/apis/errorMessage';
import { AUTH_USER } from '@/apis/keys';

const LoginController = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [fillFormComplete, setFillFormComplete] = useState(false);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    router.replace('/');
  }, [router]);

  useEffect(() => {
    passwordInputRef.current?.focus();
  }, [showPasswordInput]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!email) {
        return;
      }

      if (email) {
        setShowPasswordInput(true);
      }

      if (email && password) {
        const data = { email, password };
        try {
          const response = await emailLoginAPI(data);

          if (response?.success) {
            mutate(AUTH_USER);

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

    [email, password, router, mutate],
  );

  const handleSocialLogin = useCallback(
    async (event: React.MouseEvent) => {
      if (!event) return;
      const target = event.currentTarget as HTMLDivElement;
      const loginType = target.getAttribute('data-name') as 'google' | 'github';

      if (loginType === 'google') {
        return router.push(
          `${process.env.NEXT_PUBLIC_SERVER_API_HOST}/user/login/google`,
        );
      }
      if (loginType === 'github') {
        return router.push(
          `${process.env.NEXT_PUBLIC_SERVER_API_HOST}/user/login/github`,
        );
      }
    },
    [router],
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

  const handleSignupRouting = useCallback(() => {
    router.push('/signUp');
  }, [router]);

  const handlePwInquiryRouting = useCallback(() => {
    router.push('/pwInquiry');
  }, [router]);

  useEffect(() => {
    const { hasEmailInfo, duplicate, error, firstTime } = router.query;

    if (hasEmailInfo === 'false') {
      alert(
        '로그인한 계정에 이메일 정보가 없습니다. 이메일 정보를 등록해주세요.',
      );
      router.replace('/login', undefined, { shallow: true });
    }

    if (duplicate === 'true') {
      alert('동일한 이메일로 가입된 사용자가 존재합니다.');
      router.replace('/login', undefined, { shallow: true });
    }

    if (error === 'true') {
      alert('문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      router.replace('/login', undefined, { shallow: true });
    }

    if (firstTime === 'true') {
      setTimeout(() => {
        alert('회원가입 완료. 환영합니다 🎉');
      }, 1000);
      router.replace('/', undefined, { shallow: true });
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
    handleSignupRouting,
    handlePwInquiryRouting,
    handleSocialLogin,
  };

  return <LoginView {...props} />;
};

export default LoginController;
