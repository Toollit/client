import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import LoginView, { LoginViewProps } from './LoginView';
import { emailLoginAPI } from '@/apis/emailLogin';
import { errorMessage } from '@/apis/errorMessage';
import PrivateRoute from '@/components/PrivateRoute';

const LoginController = () => {
  const router = useRouter();
  const { mutate, cache } = useSWRConfig();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [fillFormComplete, setFillFormComplete] = useState(false);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const cachedKeysRefs = useRef<string[]>([]);

  const handleClose = useCallback(() => {
    router.replace('/');
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

      if (email && password) {
        const data = { email, password };
        try {
          const response = await emailLoginAPI(data);

          if (response?.success) {
            // All keys revalidate when logging in, logging out, because information may not be updated properly on certain pages
            for (let i = 0; i < cachedKeysRefs.current.length; i++) {
              mutate(cachedKeysRefs.current[i], undefined, true);
            }

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
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!event) return;

      const target = event.currentTarget;
      const loginType = target.getAttribute('data-name') as 'google' | 'github';

      const baseURL = process.env.NEXT_PUBLIC_SERVER_API_HOST;

      // All keys revalidate when logging in, logging out, because information may not be updated properly on certain pages
      for (let i = 0; i < cachedKeysRefs.current.length; i++) {
        mutate(cachedKeysRefs.current[i], undefined, true);
      }

      if (loginType === 'google') {
        return router.push(`${baseURL}/api/user/login/google`);
      }
      if (loginType === 'github') {
        return router.push(`${baseURL}/api/user/login/github`);
      }
    },
    [router, mutate],
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

  const handleSignUpRouting = useCallback(() => {
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

  useEffect(() => {
    const cachedKeys = cache.keys();

    for (let key of cachedKeys) {
      cachedKeysRefs.current = [...cachedKeysRefs.current, key];
    }

    console.log('cachedKeysRefs ===>', cachedKeysRefs.current);
  }, [cache]);

  // focus password input
  useEffect(() => {
    passwordInputRef.current?.focus();
  }, [showPasswordInput]);

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
    handleSignUpRouting,
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
