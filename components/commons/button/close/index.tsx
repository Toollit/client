import React from 'react';
import { CloseIcon } from '@/assets/icons';
import { Button } from './styles';
import useCheckUserAgent from '@/hooks/useCheckUserAgent';

interface CloseButtonProps {
  handleClose: () => void;
}

const CloseButton = ({ handleClose }: CloseButtonProps) => {
  const { isMobile } = useCheckUserAgent();

  return (
    <Button onClick={handleClose} isMobile={isMobile}>
      <CloseIcon />
    </Button>
  );
};

export default CloseButton;
