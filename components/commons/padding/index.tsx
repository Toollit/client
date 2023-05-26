import React from 'react';
import { PaddingDiv } from './styles';

interface PaddingProps {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

const Padding = ({ top, right, bottom, left }: PaddingProps) => {
  return <PaddingDiv top={top} right={right} bottom={bottom} left={left} />;
};

export default Padding;
