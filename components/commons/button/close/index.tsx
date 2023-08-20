import React from 'react';
import { CloseIcon } from '@/assets/icons';
import { Button } from './styles';

interface CloseBtnProps {
  onClick?: () => void;
}

const CloseBtn = ({ onClick }: CloseBtnProps) => {
  return (
    <Button onClick={onClick}>
      <CloseIcon />
    </Button>
  );
};

export default CloseBtn;
