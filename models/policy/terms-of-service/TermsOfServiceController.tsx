import React, { useCallback } from 'react';
import TermsOfServiceView, {
  TermsOfServiceViewProps,
} from './TermsOfServiceView';
import { useRouter } from 'next/router';

const TermsOfServiceController = () => {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const props: TermsOfServiceViewProps = {
    handleClose,
  };

  return <TermsOfServiceView {...props} />;
};

export default TermsOfServiceController;
