import React, { useCallback } from 'react';
import PrivacyView, { ViewProps } from './PrivacyView';
import { useRouter } from 'next/router';

const PrivacyController = () => {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const props: ViewProps = {
    handleClose,
  };

  return <PrivacyView {...props} />;
};

export default PrivacyController;
