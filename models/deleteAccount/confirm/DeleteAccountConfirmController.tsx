import React, { FC, useEffect } from 'react';
import DeleteAccountConfirmView, {
  ViewProps,
} from './DeleteAccountConfirmView';
import { deleteAccountConfirmAPI } from '@/apis/deleteAccountConfirm';
import { useRouter } from 'next/router';
import { errorMessage } from '@/apis/errorMessage';

export interface ControllerProps {}

const DeleteAccountConfirmController: FC<ControllerProps> = ({}) => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { email, a1, a2, a3 } = router.query as {
      email: string | undefined;
      a1: string | undefined;
      a2: string | undefined;
      a3: string | undefined;
    };

    // a1, a2, a3 are proof of delete account auth code
    if (!email || !a1 || !a2 || !a3) {
      alert('비정상적인 접근입니다.');
      router.replace('/');
      return;
    }

    (async () => {
      try {
        await deleteAccountConfirmAPI({ email, a1, a2, a3 });

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
