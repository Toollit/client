import React from 'react';
import { CloseIcon } from '@/assets/icons';
import { Container, Button, Title } from './styles';

interface CloseBtnProps {
  onClick: () => void;
  title?: string;
}

const CloseBtn = ({ onClick, title }: CloseBtnProps) => {
  return (
    <Container>
      <Button onClick={onClick}>
        <CloseIcon />
      </Button>
      <Title>{title}</Title>
    </Container>
  );
};

export default CloseBtn;
