import React from 'react';
import { Button, Text } from './styles';

interface SubmitBtnProps {
  text: string;
}

const SubmitBtn = ({ text }: SubmitBtnProps) => {
  return (
    <Button>
      <Text color={'white'}>{text}</Text>
    </Button>
  );
};

export default SubmitBtn;
