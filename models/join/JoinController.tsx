import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import JoinView, { JoinViewProps } from './JoinView';
import useInput from 'hooks/useInput';
import { useDispatch } from 'react-redux';
import { emailAuth } from 'reducers/join';

const JoinController = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, onChangeEmail] = useInput('');
  const [emailInvalidFormatError, setEmailInvalidFormatError] = useState(false);
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [fillFormComplete, setFillFormComplete] = useState(false);

  const handleClose = useCallback(() => {
    router.push('/login');
  }, [router]);

  const checkEmailValidateFormat = useCallback(() => {
    const emailValidationRegexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isEmailValidate = emailValidationRegexp.test(email as string);

    return isEmailValidate;
  }, [email]);

  const checkPasswordMatch = useCallback(() => {
    return password === passwordCheck ?? false;
  }, [password, passwordCheck]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const isValidEmail = checkEmailValidateFormat();
      const isPasswordMatch = checkPasswordMatch();

      if (!isValidEmail) {
        return setEmailInvalidFormatError(true);
      }

      if (!isPasswordMatch) {
        return setPasswordMismatchError(true);
      }

      if (fillFormComplete && isPasswordMatch) {
        if (email === null || password === null) return;

        let data = { email, password };

        dispatch(emailAuth(data));

        router.push('/join/emailAuth');
      }
    },
    [
      router,
      dispatch,
      email,
      password,
      checkEmailValidateFormat,
      checkPasswordMatch,
      fillFormComplete,
    ],
  );

  useEffect(() => {
    let resetErrorStatus: number;

    if (emailInvalidFormatError) {
      resetErrorStatus = window.setTimeout(() => {
        setEmailInvalidFormatError(false);
      }, 2000);
    }

    if (passwordMismatchError) {
      resetErrorStatus = window.setTimeout(() => {
        setPasswordMismatchError(false);
      }, 2000);
    }

    return () => {
      clearTimeout(resetErrorStatus);
    };
  }, [emailInvalidFormatError, passwordMismatchError]);

  useEffect(() => {
    let isFormComplete = Boolean(email && password && passwordCheck);
    console.log('isFormComplete ===>', isFormComplete);

    setFillFormComplete(isFormComplete);
  }, [email, password, passwordCheck]);

  const props: JoinViewProps = {
    handleClose,
    email,
    onChangeEmail,
    emailInvalidFormatError,
    password,
    onChangePassword,
    passwordCheck,
    onChangePasswordCheck,
    passwordMismatchError,
    fillFormComplete,
    handleSubmit,
  };
  return <JoinView {...props} />;
};

export default JoinController;
