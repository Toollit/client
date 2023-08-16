import React from 'react';
import { useSelector } from 'react-redux';
import Nav from './nav';
import Alert from '@/components/commons/alert';
import { RootState } from '@/store';
import { Container, Content } from './styles';
import Report from '@/components/commons/report';

interface Props {
  children: React.ReactNode;
  nav: boolean;
}

const AppLayout = ({ children, nav }: Props) => {
  const alertState = useSelector((state: RootState) => state.alert);

  return (
    <Container>
      {nav && <Nav />}
      <Content nav={true}>{children}</Content>

      {alertState.show && (
        <Alert type={alertState.type} text={alertState.text} />
      )}
      <Report />
    </Container>
  );
};

export default AppLayout;
