import React, { FC, useCallback, useRef, useState } from 'react';
import ContactView, { ViewProps } from './ContactView';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';
import { SelectChangeEvent } from '@mui/material';
import { contactAPI } from '@/apis/contact';
import { useAppDispatch } from '@/store';
import { loading } from '@/features/loading';

export interface ControllerProps {}

const ContactController: FC<ControllerProps> = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { authMutate } = useAuth();
  const contactTypeOptionsRef = useRef([
    '시스템 및 사이트 오류',
    '회원가입/정보관리',
    '이벤트',
    '기타',
  ]);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!title) {
        return alert('제목을 입력해주세요.');
      }

      if (title.length > 100) {
        return alert('제목은 최대 100자까지 가능합니다.');
      }

      if (!type) {
        return alert('문의 유형을 선택해 주세요.');
      }

      if (!content) {
        return alert('내용을 입력해주세요.');
      }

      try {
        dispatch(loading({ status: true }));

        const auth = await authMutate();

        if (!auth?.success) {
          dispatch(loading({ status: false }));

          const wantsToSignin = confirm('로그인 후 이용 가능합니다.');

          if (wantsToSignin) {
            return router.push('/signin');
          }
        }

        if (auth?.success) {
          await contactAPI({ type, title, content });

          alert(
            '최대한 빠른 시간 내에 검토 후 이메일로 답변드리도록 하겠습니다.',
          );

          router.push('/');

          return router.events.on('routeChangeComplete', () => {
            dispatch(loading({ status: false }));
          });
        }
      } catch (error) {
        dispatch(loading({ status: false }));
        errorMessage(error);
      }
    },
    [authMutate, dispatch, router, type, title, content],
  );

  const handleTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;

      setTitle(value);
    },
    [],
  );

  const handleType = useCallback((event: SelectChangeEvent<unknown>) => {
    const type = event.target.value;

    if (typeof type === 'string') {
      setType(type);
    }
  }, []);

  const handleContent = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = event.currentTarget.value;

      setContent(value);
    },
    [],
  );

  const props: ViewProps = {
    options: contactTypeOptionsRef.current,
    handleSubmit,
    title,
    type,
    content,
    contentLength: content.length,
    handleTitle,
    handleType,
    handleContent,
  };

  return <ContactView {...props} />;
};

export default ContactController;
