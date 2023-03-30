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

const EmailAuthController = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const email = useSelector((state: RootState) => state.signup.email);
  const password = useSelector((state: RootState) => state.signup.password);
  const authNums = useSelector((state: RootState) => state.signup.authNums);

  const [inputAuthNums, onChangeInputAuthNums] = useNoSpaceInput('');
  const [invalidAuthNumsError, setInvalidAuthNumsError] = useState(false);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);

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
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    if ((!email && !password) || (minutes === 0 && seconds === 0)) {
      dispatch(resetAuth());
      setMinutes(0);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [minutes, seconds, dispatch, email, password]);

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
    timer: `0${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`,
    authNums: authNums as string,
  };
  return <EmailAuthView {...props} />;
};

export default EmailAuthController;
