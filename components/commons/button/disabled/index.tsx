import React from 'react';
import { Button, Text, ContentContainer } from './styles';

interface DisabledBtnProps {
  text: string;
}

const DisabledBtn = ({ text }: DisabledBtnProps) => {
  return (
    <Button>
      <ContentContainer>
        <Text color={'white'}>{text}</Text>
      </ContentContainer>
    </Button>
  );
};

export default DisabledBtn;
