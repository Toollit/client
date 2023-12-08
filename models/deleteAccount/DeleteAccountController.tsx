import React, { useCallback, useEffect, useState } from 'react';
import DeleteAccountView, { DeleteAccountViewProps } from './DeleteAccountView';
import { deleteAccountAPI } from '@/apis/deleteAccount';
import { errorMessage } from '@/apis/errorMessage';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/store';
import { loading } from '@/features/loading';
import useCachedKeys from '@/hooks/useCachedKeys';
import PrivateRoute from '@/components/PrivateRoute';

export interface DeleteAccountControllerProps {}

const DeleteAccountController = ({}: DeleteAccountControllerProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { clearCache } = useCachedKeys();

  const [deleteAgree, setDeleteAgree] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!deleteAgree) {
        return;
      }

      try {
        dispatch(loading({ status: true }));

        await deleteAccountAPI({});

        alert('메일 발송 완료! 메일을 통해 인증하면 회원 탈퇴가 완료됩니다.');

        clearCache();

        router.replace('/');

        return router.events.on('routeChangeComplete', () => {
          dispatch(loading({ status: false }));
        });
      } catch (error) {
        dispatch(loading({ status: false }));
        errorMessage(error);
      }
    },
    [router, dispatch, deleteAgree, clearCache],
  );

  const handleDeleteAgree = useCallback(() => {
    setDeleteAgree((prev) => !prev);
  }, []);

  useEffect(() => {
    if (deleteAgree) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [deleteAgree]);

  const props: DeleteAccountViewProps = {
    handleSubmit,
    deleteAgree,
    handleDeleteAgree,
    isFormValid,
  };

  return (
    <PrivateRoute accessibleUser='authorized'>
      <DeleteAccountView {...props} />
    </PrivateRoute>
  );
};

export default DeleteAccountController;
