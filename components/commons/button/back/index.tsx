import React from 'react';
import { ArrowBackIcon } from '@/assets/icons';
import { Button } from './styles';

interface BackBtnProps {
  onClick?: () => void;
}

const BackBtn = ({ onClick }: BackBtnProps) => {
  return (
    <Button onClick={onClick}>
      <ArrowBackIcon />
    </Button>
  );
};

export default BackBtn;
