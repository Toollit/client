import React from 'react';
import { DividerContainer, LineWithText, Text, ThinLine } from './styles';

interface DividerProps {
  type: 'thin' | 'thick' | 'text';
  text?: string;
}

const Divider = ({ type, text }: DividerProps) => {
  switch (type) {
    case 'thin':
      return (
        <DividerContainer>
          <ThinLine />
        </DividerContainer>
      );

    case 'text':
      return (
        <DividerContainer>
          <LineWithText />
          <Text>{text}</Text>
          <LineWithText />
        </DividerContainer>
      );

    default:
      return <></>;
  }
};

export default Divider;
