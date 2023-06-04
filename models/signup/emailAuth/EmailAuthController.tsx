import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from 'store';
import useNoSpaceInput from 'hooks/useNoSpaceInput';
import EmailAuthView, { EmailAuthViewProps } from './EmailAuthView';
import { emailAuth } from '@/features/signUp';
import { signUpAPI, SignUpData } from 'apis/signUp';
import useTimer from '@/hooks/useTimer';
import { errorMessage } from '@/apis/errorMessage';
import { emailVerifyAPI } from '@/apis/emailVerify';

const EmailAuthController = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const email = useSelector((state: RootState) => state.signUp.email);
  const password = useSelector((state: RootState) => state.signUp.password);

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

      const isTimerEnd = leftMinutes + leftSeconds === 0;

      if (isTimerEnd) {
        return alert('인증시간이 만료되었습니다.');
      }

      if (inputAuthNums === '') {
        // return setInvalidAuthNumsError(true);
        return alert('인증번호를 입력해주세요.');
      }

      //TODO 인증번호가 일치하지않습니다 오류 빨간색 글씨 지우기
      if (inputAuthNums) {
        try {
          await emailVerifyAPI({ email, authCode: inputAuthNums });

          const data: SignUpData = { email, password, signUpType: 'email' };

          const response = await signUpAPI(data);

          if (response?.success) {
            alert('회원가입 완료. 환영합니다 🎉');

            return router.replace('/');
          }
        } catch (error) {
          errorMessage(error);
        }
      }
    },

    [inputAuthNums, email, password, router, leftMinutes, leftSeconds],
  );

  useEffect(() => {
    setInvalidAuthNumsError(false);
  }, [inputAuthNums]);

  // Initialize input information when going back
  useEffect(() => {
    return () => {
      const data = { email: '', password: '' };
      dispatch(emailAuth(data));
    };
  }, [dispatch, email, password]);

  //TODO 이 페이지로 넘어올때 /signUp/emailAuth 주소에서 넘어온게 아니면 redux store의 email, password 초기화
  //TODO email, password가 없는 상태로 해당페이지 접근시 어떻게 처리할지 생각해보기

  const checkTimerLeftTime = useCallback(() => {
    if (email && password) {
      const isTimerEnd = leftMinutes + leftSeconds === 0;

      if (isTimerEnd) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }, [email, password, leftMinutes, leftSeconds]);

  useEffect(() => {
    const isTimerEnd = leftMinutes + leftSeconds === 0;
    if (isTimerEnd) {
      const data = { email: '', password: '' };
      dispatch(emailAuth(data));
    }
  }, [leftMinutes, leftSeconds, dispatch]);

  const props: EmailAuthViewProps = {
    handleClose,
    inputAuthNums,
    onChangeInputAuthNums,
    invalidAuthNumsError,
    handleSubmit,
    timer: email && password ? timer : '00:00',
    isTimerLeft: checkTimerLeftTime(),
  };
  return <EmailAuthView {...props} />;
};

export default EmailAuthController;
