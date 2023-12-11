import React from 'react';
import Nav, { NavProps } from '@/components/appLayout/nav';
import Footer from '@/components/appLayout/footer';
import Alert from '@/components/commons/alert';
import LoadingCircularProgress from '@/components/commons/loading';
import SearchDrawer from '@/components/commons/drawer/search';
import { Container, Content } from './styles';

type AppLayoutProps = NavProps & {
  children: React.ReactNode;
  footer?: boolean;
};

/**
 * @props children - content component
 * @props type - GNB style
 */
const AppLayout = (props: AppLayoutProps) => {
  const { children, footer = true } = props;
  return (
    <Container type={props.type}>
      <Nav {...props} />

      <Content>{children}</Content>

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
