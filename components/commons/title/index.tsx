import React from 'react';
import { Container, Text } from './styles';

interface TitleProps {
  text: string;
}

const Title = ({ text }: TitleProps) => {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
};

export default Title;
