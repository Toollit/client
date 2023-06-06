import React, { useCallback } from 'react';
import PrivacyView, { PrivacyViewProps } from './PrivacyView';
import { useRouter } from 'next/router';

const PrivacyController = () => {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const props: PrivacyViewProps = {
    handleClose,
  };

  return <PrivacyView {...props} />;
};

export default PrivacyController;
