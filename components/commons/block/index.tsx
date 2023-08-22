import React from 'react';
import { Container } from './styles';

export interface BlockProps {
  children: React.ReactNode;
  paddingLeft?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
}

const Block = ({
  children,
  paddingLeft,
  paddingTop,
  paddingRight,
  paddingBottom,
}: BlockProps) => {
  return (
    <Container
      paddingLeft={paddingLeft}
      paddingTop={paddingTop}
      paddingRight={paddingRight}
      paddingBottom={paddingBottom}
    >
      {children}
    </Container>
  );
};

export default Block;
