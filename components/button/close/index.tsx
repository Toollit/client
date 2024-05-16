import React, { FC } from 'react';
import { CloseIcon } from '@/assets/icons';
import { Button } from './styles';
import useCheckUserAgent from '@/hooks/useCheckUserAgent';

interface Props {
  handleClose: () => void;
}

const CloseButton: FC<Props> = ({ handleClose }) => {
  const { isMobile } = useCheckUserAgent();

  return (
    <Button onClick={handleClose} isMobile={isMobile}>
      <CloseIcon />
    </Button>
  );
};

export default CloseButton;
