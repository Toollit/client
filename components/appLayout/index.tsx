import React from 'react';
import Nav, { NavProps } from '@/components/commons/nav';
import Alert from '@/components/commons/alert';
import LoadingCircularProgress from '@/components/commons/loading';
import { Container, Content } from './styles';

interface AppLayoutProps extends NavProps {
  children: React.ReactNode;
}

const AppLayout = ({
  children,
  type,
  title,
  menu,
  boundary,
  fullSize,
  onClick,
}: AppLayoutProps) => {
  return (
    <Container>
      <Nav
        type={type}
        title={title}
        menu={menu}
        boundary={boundary}
        fullSize={fullSize}
        onClick={onClick}
      />
      <Content type={type}>{children}</Content>
      <Alert />
      <LoadingCircularProgress />
    </Container>
  );
};

export default AppLayout;
