import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ResetPasswordView, { ResetPasswordViewProps } from './ResetPasswordView';
import { logoutAPI } from '@/apis/logout';
import { resetPasswordAPI } from '@/apis/resetPassword';
import useNoSpaceInput from 'hooks/useNoSpaceInput';
import { errorMessage } from '@/apis/errorMessage';
import { authFetcher } from '@/apis/authFetcher';
import { AUTH_USER } from '@/apis/keys';
import useSWR from 'swr';

const ResetPasswordController = () => {
  const router = useRouter();

  const [newPassword, onChangeNewPassword] = useNoSpaceInput('');
  const [newPasswordInvalidError, setNewPasswordInvalidError] = useState(false);
  const [doubleCheckPassword, onChangeDoubleCheckPassword] =
    useNoSpaceInput('');
  const [doubleCheckPasswordError, setDoubleCheckPasswordError] =
    useState(false);
  const [requestPending, setRequestPending] = useState(false);

  const { data } = useSWR(AUTH_USER, authFetcher);

  if (data?.message !== 'needResetPassword') {
    router.replace('/');
  }

  const checkPasswordValidate = useCallback(() => {
    // password 영문자, 숫자, 특수문자 조합 8 ~ 20자리 형식 확인 정규식
    const passwordValidationRegexp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

    if (typeof newPassword === 'string') {
      const isValidatePassword = passwordValidationRegexp.test(newPassword);

      return isValidatePassword;
    }
  }, [newPassword]);

  const checkPasswordMatch = useCallback(() => {
    return newPassword === doubleCheckPassword ?? false;
  }, [newPassword, doubleCheckPassword]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const isValidePassword = checkPasswordValidate();
      const isPasswordMatch = checkPasswordMatch();

      if (!isValidePassword) {
        return setNewPasswordInvalidError(true);
      }

      if (!isPasswordMatch) {
        return setDoubleCheckPasswordError(true);
      }

      if (newPassword && doubleCheckPassword) {
        setRequestPending(true);

        try {
          const resetPasswordAPIResponse = await resetPasswordAPI({
            password: newPassword,
          });

          setRequestPending(false);

          if (resetPasswordAPIResponse?.success) {
            const logoutAPIResponse = await logoutAPI();

            if (logoutAPIResponse?.success) {
              alert(resetPasswordAPIResponse.message);
              router.replace('/login');
            }
          }
        } catch (error) {
          setRequestPending(false);
          errorMessage(error);
        }
      }
    },
    [
      checkPasswordValidate,
      checkPasswordMatch,
      newPassword,
      doubleCheckPassword,
      router,
    ],
  );

  const handleLogout = useCallback(async () => {
    try {
      const response = await logoutAPI();

      if (response?.success) {
        router.replace('/');
      }
    } catch (error) {
      errorMessage(error);
    }
  }, [router]);

  useEffect(() => {
    setNewPasswordInvalidError(false);
  }, [newPassword]);

  useEffect(() => {
    setDoubleCheckPasswordError(false);
  }, [doubleCheckPassword]);

  const props: ResetPasswordViewProps = {
    newPassword,
    onChangeNewPassword,
    newPasswordInvalidError,
    doubleCheckPassword,
    onChangeDoubleCheckPassword,
    doubleCheckPasswordError,
    handleSubmit,
    handleLogout,
    requestPending,
  };

  return <ResetPasswordView {...props} />;
};

export default ResetPasswordController;
