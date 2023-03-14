import React from 'react';
import Nav from './Nav';
import { Container } from './styles';

interface Props {
  children: React.ReactNode;
  nav: boolean;
}

const AppLayout = ({ children, nav }: Props) => {
  return (
    <Container>
      {nav && <Nav />}
      {children}
    </Container>
  );
};

export default AppLayout;
