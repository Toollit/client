import React, { useCallback, useEffect, useState } from 'react';
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
import { noop } from '@/utils/noop';

const ResetPasswordController = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { message } = useAuth();
  const { logOut } = useLogout();

  const isLoading = useSelector((state: RootState) => state.isLoading.status);

  const [newPassword, onChangeNewPassword] = useNoSpaceInput('');
  const [newPasswordInvalidError, setNewPasswordInvalidError] = useState(false);
  const [doubleCheckPassword, onChangeDoubleCheckPassword] =
    useNoSpaceInput('');
  const [doubleCheckPasswordError, setDoubleCheckPasswordError] =
    useState(false);

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
        return setNewPasswordInvalidError(true);
      }

      if (!isPasswordMatch) {
        return setDoubleCheckPasswordError(true);
      }

      if (newPassword && doubleCheckPassword) {
        try {
          dispatch(loading({ status: true }));

          const response = await resetPasswordAPI({ password: newPassword });

          dispatch(loading({ status: false }));

          logOut({ push: '/login' });

          alert(response?.message);
        } catch (error) {
          dispatch(loading({ status: false }));
          errorMessage(error);
        }
      }
    },
    [
      checkPasswordValidate,
      checkPasswordMatch,
      newPassword,
      doubleCheckPassword,
      logOut,
      dispatch,
    ],
  );

  const handleLogout = useCallback(() => {
    logOut({ replace: '/' });
  }, [logOut]);

  useEffect(() => {
    setNewPasswordInvalidError(false);
  }, [newPassword]);

  useEffect(() => {
    setDoubleCheckPasswordError(false);
  }, [doubleCheckPassword]);

  useEffect(() => {
    if (message !== 'needResetPassword') {
      router.replace('/');
    }
  }, [message, router]);

  const props: ResetPasswordViewProps = {
    newPassword: newPassword ?? '',
    onChangeNewPassword: isLoading ? noop : onChangeNewPassword,
    newPasswordInvalidError,
    doubleCheckPassword: doubleCheckPassword ?? '',
    onChangeDoubleCheckPassword: isLoading ? noop : onChangeDoubleCheckPassword,
    doubleCheckPasswordError,
    handleSubmit,
    handleLogout,
    isLoading,
  };

  return (
    <PrivateRoute accessibleUser='authorized'>
      <ResetPasswordView {...props} />
    </PrivateRoute>
  );
};

export default ResetPasswordController;
