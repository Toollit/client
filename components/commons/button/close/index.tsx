import React from 'react';
import { CloseIcon } from '@/assets/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Button, IconContainer } from './styles';

interface CloseBtnProps {
  onClick: () => void;
}

const CloseBtn = ({ onClick }: CloseBtnProps) => {
  return (
    <Button>
      <IconContainer onClick={onClick}>
        <CloseIcon />
      </IconContainer>
    </Button>
  );
};

export default CloseBtn;
