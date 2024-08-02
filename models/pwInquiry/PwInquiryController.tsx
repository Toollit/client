import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { createTemporaryPasswordAPI } from '@/apis/createTemporaryPassword';
import useNoSpaceInput from '@/hooks/useNoSpaceInput';
import { useRouter } from 'next/router';
import PwInquiryView, { ViewProps } from './PwInquiryView';
import { errorMessage } from '@/apis/config/errorMessage';
import { loading } from '@/features/loading';
import { useAppDispatch, useAppSelector } from '@/store';
import PrivateRoute from '@/components/PrivateRoute';

export interface ControllerProps {}

const PwInquiryController: FC<ControllerProps> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isLoading = useAppSelector((state) => state.isLoading.status);

  const [email, onChangeEmail] = useNoSpaceInput('');
  const [emailInvalidError, setEmailInvalidError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  // check email format
  const checkEmailFormatValidate = useCallback((email: string) => {
    const emailValidationRegexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isEmailValidate = emailValidationRegexp.test(email);

    return isEmailValidate;
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!email) {
        return;
      }

      const isValidEmail = checkEmailFormatValidate(email);

      if (!isValidEmail) {
        return setEmailInvalidError(true);
      }

      if (isLoading) {
        return;
      }

      try {
        inputRef.current?.blur();

        dispatch(loading({ status: true }));

        await createTemporaryPasswordAPI({ email });

        alert('해당 이메일로 임시 비밀번호를 발급했습니다.');

        router.push('/signin');

        router.events.on('routeChangeComplete', () => {
          dispatch(loading({ status: false }));
        });
      } catch (error) {
        dispatch(loading({ status: false }));
        errorMessage(error);
        inputRef.current?.focus();
      }
    },
    [email, router, checkEmailFormatValidate, dispatch, isLoading],
  );

  // remove error message when input value is changed
  useEffect(() => {
    setEmailInvalidError(false);
  }, [email]);

  const props: ViewProps = {
    handleClose,
    email,
    onChangeEmail,
    emailInvalidError,
    handleSubmit,
    inputRef,
  };
  return (
    <PrivateRoute accessibleUser='unauthorized'>
      <PwInquiryView {...props} />
    </PrivateRoute>
  );
};

export default PwInquiryController;
