import React from 'react';
import { Button, Text, ContentContainer } from './styles';

interface DisabledBtnProps {
  text: string;
  color?: 'black' | 'gray' | 'white';
}

const DisabledBtn = ({ text, color = 'white' }: DisabledBtnProps) => {
  return (
    <Button>
      <ContentContainer>
        <Text color={color}>{text}</Text>
      </ContentContainer>
    </Button>
  );
};

export default DisabledBtn;
