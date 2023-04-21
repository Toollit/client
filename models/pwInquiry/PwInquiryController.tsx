import { pwInquiryAPI } from '@/apis/pwInquiry';
import useNoSpaceInput from 'hooks/useNoSpaceInput';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import PwInquiryView, { PwInquiryViewProps } from './PwInquiryView';
import { errorMessage } from '@/apis/errorMessage';

const PwInquiryController = () => {
  const router = useRouter();
  const [email, onChangeEmail] = useNoSpaceInput('');
  const [emailInvalidError, setEmailInvalidError] = useState(false);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const checkEmailFormatValidate = useCallback(() => {
    // email 형식 확인 정규식
    const emailValidationRegexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isEmailValidate = emailValidationRegexp.test(email as string);

    return isEmailValidate;
  }, [email]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const isValidEmail = checkEmailFormatValidate();

      if (!email) {
        return setEmailInvalidError(true);
      }

      if (!isValidEmail) {
        return setEmailInvalidError(true);
      }

      try {
        const response = await pwInquiryAPI({ email });

        if (response?.success) {
          alert(response.message);
          router.push('/login');
        }
      } catch (error) {
        errorMessage(error);
      }
    },
    [email, router, checkEmailFormatValidate],
  );

  const handleSignUp = useCallback(() => {
    router.push('/signUp');
  }, [router]);

  // input 입력시 에러 제거
  useEffect(() => {
    setEmailInvalidError(false);
  }, [email]);

  const props: PwInquiryViewProps = {
    handleClose,
    email,
    onChangeEmail,
    emailInvalidError,
    handleSubmit,
    handleSignUp,
  };
  return <PwInquiryView {...props} />;
};

export default PwInquiryController;
