import React, { useCallback, useEffect, useState } from 'react';
import { pwInquiryAPI } from '@/apis/pwInquiry';
import useNoSpaceInput from '@/hooks/useNoSpaceInput';
import { useRouter } from 'next/router';
import PwInquiryView, { PwInquiryViewProps } from './PwInquiryView';
import { errorMessage } from '@/apis/errorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { loading } from '@/features/loading';
import { RootState } from '@/store';
import { noop } from '@/utils/noop';

const PwInquiryController = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isLoading = useSelector((state: RootState) => state.isLoading.status);

  const [email, onChangeEmail] = useNoSpaceInput('');
  const [emailInvalidError, setEmailInvalidError] = useState(false);

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

      try {
        dispatch(loading({ status: true }));

        const response = await pwInquiryAPI({ email });

        alert(response?.message);

        dispatch(loading({ status: false }));

        router.push('/login');
      } catch (error) {
        dispatch(loading({ status: false }));
        errorMessage(error);
      }
    },
    [email, router, checkEmailFormatValidate, dispatch],
  );

  const handleSignUp = useCallback(() => {
    router.push('/signUp');
  }, [router]);

  // remove error message when input value is changed
  useEffect(() => {
    setEmailInvalidError(false);
  }, [email]);

  const props: PwInquiryViewProps = {
    handleClose,
    email,
    onChangeEmail: isLoading ? noop : onChangeEmail,
    emailInvalidError,
    handleSubmit,
    handleSignUp,
    isLoading,
  };
  return <PwInquiryView {...props} />;
};

export default PwInquiryController;
