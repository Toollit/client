import React from 'react';
import ArrowBackIcon from '@/assets/icons/ArrowBackIcon';
import { Button } from './styles';
import useCheckUserAgent from '@/hooks/useCheckUserAgent';

interface BackButtonProps {
  handleBack: () => void;
}

const BackButton = ({ handleBack }: BackButtonProps) => {
  const { isMobile } = useCheckUserAgent();

  return (
    <Button onClick={handleBack} isMobile={isMobile}>
      <ArrowBackIcon />
    </Button>
  );
};

export default BackButton;
