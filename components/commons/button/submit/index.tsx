import React from 'react';
import { Button, Text } from './styles';

interface SubmitBtnProps {
  text: string;
  color?: 'black' | 'gray' | 'white';
}

const SubmitBtn = ({ text, color = 'white' }: SubmitBtnProps) => {
  return (
    <Button>
      <Text color={color}>{text}</Text>
    </Button>
  );
};

export default SubmitBtn;
