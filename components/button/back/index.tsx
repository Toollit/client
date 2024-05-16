import React, { FC } from 'react';
import { ArrowBackIcon } from '@/assets/icons';
import { Button } from './styles';
import useCheckUserAgent from '@/hooks/useCheckUserAgent';

interface Props {
  handleBack: () => void;
}

const BackButton: FC<Props> = ({ handleBack }) => {
  const { isMobile } = useCheckUserAgent();

  return (
    <Button onClick={handleBack} isMobile={isMobile}>
      <ArrowBackIcon />
    </Button>
  );
};

export default BackButton;
