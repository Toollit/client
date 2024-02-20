import React from 'react';
import { Container } from './styles';

export interface BlockProps {
  children: React.ReactNode;
  paddingLeft?: number | string;
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  marginLeft?: number | string;
  marginTop?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
}

const Block = ({
  children,
  paddingLeft,
  paddingTop,
  paddingRight,
  paddingBottom,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
}: BlockProps) => {
  return (
    <Container
      paddingLeft={paddingLeft}
      paddingTop={paddingTop}
      paddingRight={paddingRight}
      paddingBottom={paddingBottom}
      marginLeft={marginLeft}
      marginTop={marginTop}
      marginRight={marginRight}
      marginBottom={marginBottom}
    >
      {children}
    </Container>
  );
};

export default Block;
