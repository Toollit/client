import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from 'store';
import axios from 'axios';
import useNoSpaceInput from 'hooks/useNoSpaceInput';
import EmailAuthView, { EmailAuthViewProps } from './EmailAuthView';
import { resetAuth, updateAuthNums } from 'features/signup';
import { emailAuthAPI } from 'apis/signup/emailAuth';
import { signupAPI, SignupApiData } from 'apis/signup';
import { AxiosErrorData } from 'apis/types';
import useTimer from '@/hooks/useTimer';

const EmailAuthController = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const email = useSelector((state: RootState) => state.signup.email);
  const password = useSelector((state: RootState) => state.signup.password);
  const authNums = useSelector((state: RootState) => state.signup.authNums);

  const [inputAuthNums, onChangeInputAuthNums] = useNoSpaceInput('');
  const [invalidAuthNumsError, setInvalidAuthNumsError] = useState(false);

  const { timer, leftMinutes, leftSeconds } = useTimer({
    minutes: 2,
    seconds: 0,
  });

  const handleClose = useCallback(() => {
    router.replace('/signup');
  }, [router]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (inputAuthNums === '') {
        return setInvalidAuthNumsError(true);
      }

      if (inputAuthNums === authNums) {
        try {
          const data: SignupApiData = { email, password, signupType: 'email' };
          const response = await signupAPI(data);

          if (response?.success) {
            alert('회원가입 완료. 환영합니다 🎉');
            dispatch(resetAuth());
            return router.replace('/');
          }
        } catch (error) {
          if (axios.isAxiosError<AxiosErrorData>(error)) {
            alert(error.response?.data.message);
          }
        }
      } else {
        if (authNums !== '') {
          setInvalidAuthNumsError(true);
        }
      }
    },
    [inputAuthNums, authNums, email, password, router, dispatch],
  );

  useEffect(() => {
    setInvalidAuthNumsError(false);
  }, [inputAuthNums]);

  useEffect(() => {
    try {
      (async () => {
        if (email) {
          const response = await emailAuthAPI({ email });
          if (response?.success) {
            return dispatch(
              updateAuthNums({ authNums: response?.data.authNums }),
            );
          }
        }
      })();
    } catch (error) {
      if (axios.isAxiosError<AxiosErrorData>(error)) {
        alert(error.response?.data.message);
      }
    }

    return () => {
      dispatch(updateAuthNums({ authNums: '' }));
    };
  }, [dispatch, email]);

  useEffect(() => {
    if ((!email && !password) || (leftMinutes === 0 && leftSeconds === 0)) {
      dispatch(resetAuth());
    }
  }, [leftMinutes, leftSeconds, dispatch, email, password]);

  useEffect(() => {
    return () => {
      dispatch(updateAuthNums({ authNums: '' }));
    };
  }, [dispatch]);

  const props: EmailAuthViewProps = {
    handleClose,
    inputAuthNums,
    onChangeInputAuthNums,
    invalidAuthNumsError,
    handleSubmit,
    timer,
    authNums: authNums as string,
  };
  return <EmailAuthView {...props} />;
};

export default EmailAuthController;
