import React from 'react';
import Nav, { NavProps } from '@/components/appLayout/nav';
import Footer from '@/components/appLayout/footer';
import Alert from '@/components/commons/alert';
import LoadingCircularProgress from '@/components/commons/loading';
import SearchDrawer from '@/components/commons/drawer/search';
import { Container, Content } from './styles';

interface AppLayoutProps extends NavProps {
  children: React.ReactNode;
  footer?: boolean;
}

const AppLayout = ({
  children,
  type,
  title,
  menu,
  boundary,
  fullSize,
  onClick,
  footer = true,
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
      {footer && <Footer />}

      {/* Right bottom notification  */}
      <Alert />
      {/* Loading bar waiting for a response to a request */}
      <LoadingCircularProgress />
      {/* Drawer that appears when you click the Nav search icon  */}
      <SearchDrawer />
    </Container>
  );
};

export default AppLayout;
