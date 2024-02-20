import React from 'react';
import { Container, Button } from './styles';

interface Props {
  text: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

const BottomButton = ({ text, disabled = false, onClick }: Props) => {
  return (
    <Container>
      <Button onClick={onClick} disabled={disabled}>
        {text}
      </Button>
    </Container>
  );
};

export default BottomButton;
