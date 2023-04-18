import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SignUpView, { SignUpViewProps } from './SignUpView';
import useNoSpaceInput from 'hooks/useNoSpaceInput';
import { useDispatch } from 'react-redux';
import { emailAuth } from '@/features/signUp';

const SignUpController = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, onChangeEmail] = useNoSpaceInput('');
  const [emailInvalidError, setEmailInvalidError] = useState(false);
  const [password, onChangePassword] = useNoSpaceInput('');
  const [passwordRestrictionError, setPasswordRestrictionError] =
    useState(false);
  const [passwordCheck, onChangePasswordCheck] = useNoSpaceInput('');
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [fillFormComplete, setFillFormComplete] = useState(false);

  const handleClose = useCallback(() => {
    router.push('/login');
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
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const isValidEmail = checkEmailFormatValidate();
      const isPasswordMatch = checkPasswordMatch();
      const isCorrectPassword = checkPasswordValidate();

      if (!isValidEmail) {
        return setEmailInvalidError(true);
      }

      if (!isCorrectPassword) {
        return setPasswordRestrictionError(true);
      }

      if (!isPasswordMatch) {
        return setPasswordMismatchError(true);
      }

      if (fillFormComplete && isPasswordMatch) {
        if (email === null || password === null) return;

        const data = { email, password };

        dispatch(emailAuth(data));

        router.push('/signUp/emailAuth');
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

  const props: SignUpViewProps = {
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
  };
  return <SignUpView {...props} />;
};

export default SignUpController;
