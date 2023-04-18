import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from 'store';
import useNoSpaceInput from 'hooks/useNoSpaceInput';
import EmailAuthView, { EmailAuthViewProps } from './EmailAuthView';
import { resetAuth, updateAuthNums } from '@/features/signUp';
import { emailAuthAPI } from '@/apis/emailAuth';
import { signUpAPI, SignUpData } from 'apis/signUp';
import useTimer from '@/hooks/useTimer';
import { errorMessage } from '@/apis/errorMessage';

const EmailAuthController = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const email = useSelector((state: RootState) => state.signUp.email);
  const password = useSelector((state: RootState) => state.signUp.password);
  const authNums = useSelector((state: RootState) => state.signUp.authNums);

  const [inputAuthNums, onChangeInputAuthNums] = useNoSpaceInput('');
  const [invalidAuthNumsError, setInvalidAuthNumsError] = useState(false);

  const { timer, leftMinutes, leftSeconds } = useTimer({
    minutes: 3,
    seconds: 0,
  });

  const handleClose = useCallback(() => {
    router.replace('/signUp');
  }, [router]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (inputAuthNums === '') {
        return setInvalidAuthNumsError(true);
      }

      if (inputAuthNums === authNums) {
        try {
          const data: SignUpData = { email, password, signUpType: 'email' };
          const response = await signUpAPI(data);

          if (response?.success) {
            alert('회원가입 완료. 환영합니다 🎉');
            dispatch(resetAuth());
            return router.replace('/');
          }
        } catch (error) {
          errorMessage(error);
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
      errorMessage(error);
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
    timer: email && password ? timer : '00:00',
    authNums: authNums as string,
  };
  return <EmailAuthView {...props} />;
};

export default EmailAuthController;
