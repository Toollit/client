import React, { useCallback } from 'react';
import TermsOfServiceView, { ViewProps } from './TermsOfServiceView';
import { useRouter } from 'next/router';

const TermsOfServiceController = () => {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const props: ViewProps = {
    handleClose,
  };

  return <TermsOfServiceView {...props} />;
};

export default TermsOfServiceController;
