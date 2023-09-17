import React, { useCallback, useEffect, useRef, useState } from 'react';
import { pwInquiryAPI } from '@/apis/pwInquiry';
import useNoSpaceInput from '@/hooks/useNoSpaceInput';
import { useRouter } from 'next/router';
import PwInquiryView, { PwInquiryViewProps } from './PwInquiryView';
import { errorMessage } from '@/apis/errorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { loading } from '@/features/loading';
import { RootState } from '@/store';

const PwInquiryController = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isLoading = useSelector((state: RootState) => state.isLoading.status);

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

        const response = await pwInquiryAPI({ email });

        if (response?.message) {
          alert(response.message);
        }

        dispatch(loading({ status: false }));

        router.push('/login');
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

  const props: PwInquiryViewProps = {
    handleClose,
    email,
    onChangeEmail,
    emailInvalidError,
    handleSubmit,
    inputRef,
  };
  return <PwInquiryView {...props} />;
};

export default PwInquiryController;
