import React, { FC, useEffect } from 'react';
import DeleteAccountConfirmView, {
  ViewProps,
} from './DeleteAccountConfirmView';
import { deleteAccountConfirmAPI } from '@/apis/deleteAccountConfirm';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/config/errorMessage';

export interface ControllerProps {}

const DeleteAccountConfirmController: FC<ControllerProps> = ({}) => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { email, authCode1, authCode2, authCode3 } = router.query as {
      email: string | undefined;
      authCode1: string | undefined;
      authCode2: string | undefined;
      authCode3: string | undefined;
    };

    if (!email || !authCode1 || !authCode2 || !authCode3) {
      alert('비정상적인 접근입니다.');
      router.replace('/');
      return;
    }

    (async () => {
      try {
        await deleteAccountConfirmAPI({
          email,
          authCode1,
          authCode2,
          authCode3,
        });

        alert('회원 탈퇴가 완료되었습니다.');

        router.replace('/');
      } catch (error) {
        errorMessage(error);
        router.replace('/');
      }
    })();
  }, [router]);
  const props: ViewProps = {};
  return <DeleteAccountConfirmView {...props} />;
};

export default DeleteAccountConfirmController;
