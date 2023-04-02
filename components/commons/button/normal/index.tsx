import React from 'react';
import { Button, Text, ContentContainer } from './styles';

interface NormalBtnProps {
  onClick?: (event: React.MouseEvent) => void;
  name?: string;
  text?: string;
  icon?: React.ReactNode;
}

const NormalBtn = ({ onClick, name, text, icon }: NormalBtnProps) => {
  return (
    <Button data-name={name} onClick={onClick}>
      <ContentContainer>
        {icon}
        <Text color={'black'}>{text}</Text>
      </ContentContainer>
    </Button>
  );
};

export default NormalBtn;
