import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import SignupView, { ViewProps } from './SignupView';
import useNoSpaceInput from '@/hooks/useNoSpaceInput';
import { emailAuth } from '@/features/signup';
import { createEmailAuthCodeAPI } from '@/apis/createEmailAuthCode';
import { errorMessage } from '@/apis/config/errorMessage';
import { useAppDispatch, useAppSelector } from '@/store';
import { fullScreenLoading } from '@/features/loading';

export interface ControllerProps {}

const SignupController: FC<ControllerProps> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(
    (state) => state.loading.isFullScreenLoading,
  );

  const [email, onChangeEmail] = useNoSpaceInput('');
  const [emailInvalidError, setEmailInvalidError] = useState(false);
  const [password, onChangePassword] = useNoSpaceInput('');
  const [passwordRestrictionError, setPasswordRestrictionError] =
    useState(false);
  const [passwordCheck, onChangePasswordCheck] = useNoSpaceInput('');
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [fillFormComplete, setFillFormComplete] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordCheckInputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    router.push('/signin');
  }, [router]);

  const checkEmailFormatValidate = useCallback(() => {
    // email 형식 확인 정규식
    const emailValidationRegexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isEmailValidate = emailValidationRegexp.test(email as string);

    return isEmailValidate;
  }, [email]);

  const checkPasswordValidate = useCallback(() => {
    // password 영문자, 숫자, 특수문자 조합 8 ~ 20자리 형식 확인 정규식
    const passwordValidationRegexp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

    if (typeof password === 'string') {
      const isValidatePassword = passwordValidationRegexp.test(password);

      return isValidatePassword;
    }
  }, [password]);

  const checkPasswordMatch = useCallback(() => {
    return password === passwordCheck ?? false;
  }, [password, passwordCheck]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const isValidEmail = checkEmailFormatValidate();
      const isCorrectPassword = checkPasswordValidate();
      const isPasswordMatch = checkPasswordMatch();

      if (!isValidEmail) {
        emailInputRef.current?.focus();
        return setEmailInvalidError(true);
      }

      if (!isCorrectPassword) {
        passwordInputRef.current?.focus();
        return setPasswordRestrictionError(true);
      }

      if (!isPasswordMatch) {
        passwordCheckInputRef.current?.focus();
        return setPasswordMismatchError(true);
      }

      if (!fillFormComplete || !isPasswordMatch) {
        return;
      }

      if (email === null || password === null) {
        return;
      }

      if (isLoading) {
        return;
      }

      const data = { email, password };

      dispatch(emailAuth(data));

      try {
        emailInputRef.current?.blur();
        passwordInputRef.current?.blur();
        passwordCheckInputRef.current?.blur();

        dispatch(fullScreenLoading(true));

        await createEmailAuthCodeAPI({ email });

        router.push('/signup/email/auth');

        router.events.on('routeChangeComplete', () => {
          dispatch(fullScreenLoading(false));
        });
      } catch (error) {
        dispatch(fullScreenLoading(false));
        errorMessage(error);
      }
    },
    [
      router,
      dispatch,
      email,
      checkEmailFormatValidate,
      password,
      checkPasswordValidate,
      checkPasswordMatch,
      fillFormComplete,
      isLoading,
    ],
  );

  // input 입력시 에러 제거
  useEffect(() => {
    setEmailInvalidError(false);
  }, [email]);

  useEffect(() => {
    setPasswordRestrictionError(false);
  }, [password]);

  useEffect(() => {
    setPasswordMismatchError(false);
  }, [passwordCheck]);

  useEffect(() => {
    const isFormComplete = Boolean(email && password && passwordCheck);

    setFillFormComplete(isFormComplete);
  }, [email, password, passwordCheck]);

  // Initialize email, password data when it comes to the current page from other pages
  useEffect(() => {
    const data = { email: '', password: '' };
    dispatch(emailAuth(data));
  }, [dispatch]);

  const props: ViewProps = {
    handleClose,
    email,
    onChangeEmail,
    emailInvalidError,
    password,
    onChangePassword,
    passwordRestrictionError,
    passwordCheck,
    onChangePasswordCheck,
    passwordMismatchError,
    fillFormComplete,
    handleSubmit,
    emailInputRef,
    passwordInputRef,
    passwordCheckInputRef,
  };
  return <SignupView {...props} />;
};

export default SignupController;
