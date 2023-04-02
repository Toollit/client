import React from 'react';
import { CloseIcon } from '@/assets/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Button, IconContainer } from './styles';

interface CloseBtnProps {
  onClick: () => void;
}

const CloseBtn = ({ onClick }: CloseBtnProps) => {
  const isMobile = useSelector((state: RootState) => state.user.isMobile);
  return (
    <Button>
      <IconContainer onClick={onClick} isMobile={isMobile ? true : false}>
        <CloseIcon />
      </IconContainer>
    </Button>
  );
};

export default CloseBtn;
