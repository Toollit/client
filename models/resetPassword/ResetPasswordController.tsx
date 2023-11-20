import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import ResetPasswordView, { ResetPasswordViewProps } from './ResetPasswordView';
import { resetPasswordAPI } from '@/apis/resetPassword';
import useNoSpaceInput from '@/hooks/useNoSpaceInput';
import { errorMessage } from '@/apis/errorMessage';
import useAuth from '@/hooks/useAuth';
import PrivateRoute from '@/components/PrivateRoute';
import useLogout from '@/hooks/useLogout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { loading } from '@/features/loading';

const ResetPasswordController = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: userAuthInfo } = useAuth();
  const { logOut } = useLogout();

  const isLoading = useSelector((state: RootState) => state.isLoading.status);

  const [newPassword, onChangeNewPassword] = useNoSpaceInput('');
  const [newPasswordInvalidError, setNewPasswordInvalidError] = useState(false);
  const [doubleCheckPassword, onChangeDoubleCheckPassword] =
    useNoSpaceInput('');
  const [doubleCheckPasswordError, setDoubleCheckPasswordError] =
    useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);
  const doubleCheckPasswordRef = useRef<HTMLInputElement>(null);

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

      const isValidationPassword = checkPasswordValidate();
      const isPasswordMatch = checkPasswordMatch();

      if (!isValidationPassword) {
        passwordRef.current?.focus();
        return setNewPasswordInvalidError(true);
      }

      if (!isPasswordMatch) {
        doubleCheckPasswordRef.current?.focus();
        return setDoubleCheckPasswordError(true);
      }

      if (isLoading) {
        return;
      }

      if (!newPassword || !doubleCheckPassword) {
        return;
      }

      try {
        passwordRef.current?.blur();
        doubleCheckPasswordRef.current?.blur();

        dispatch(loading({ status: true }));

        await resetPasswordAPI({ password: newPassword });

        alert(
          '비밀번호 변경이 완료되었습니다. 새로운 비밀번호로 다시 로그인해주세요.',
        );

        await logOut({ replace: '/login' });

        router.events.on('routeChangeComplete', () => {
          dispatch(loading({ status: false }));
        });
      } catch (error) {
        dispatch(loading({ status: false }));
        errorMessage(error);
      }
    },
    [
      checkPasswordValidate,
      checkPasswordMatch,
      newPassword,
      doubleCheckPassword,
      logOut,
      dispatch,
      isLoading,
      router,
    ],
  );

  const handleLogout = useCallback(async () => {
    await logOut({ replace: '/' });
  }, [logOut]);

  useEffect(() => {
    setNewPasswordInvalidError(false);
  }, [newPassword]);

  useEffect(() => {
    setDoubleCheckPasswordError(false);
  }, [doubleCheckPassword]);

  useEffect(() => {
    if (userAuthInfo?.needResetPassword === false) {
      router.replace('/');
    }
  }, [userAuthInfo, router]);

  const props: ResetPasswordViewProps = {
    newPassword: newPassword ?? '',
    onChangeNewPassword,
    newPasswordInvalidError,
    doubleCheckPassword: doubleCheckPassword ?? '',
    onChangeDoubleCheckPassword,
    doubleCheckPasswordError,
    handleSubmit,
    handleLogout,
    passwordRef,
    doubleCheckPasswordRef,
  };

  return (
    <PrivateRoute accessibleUser='authorized'>
      <ResetPasswordView {...props} />
    </PrivateRoute>
  );
};

export default ResetPasswordController;
