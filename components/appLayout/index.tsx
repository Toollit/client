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

/**
 * @props children - content component
 * @props type - GNB style
 * @props title - title to be shown in the middle of the GNB
 * @props boundary - GNB border bottom
 * @props fullSize - GNB width size. (true - width 100%, false - width 102.4rem)
 * @props onClick - GNB left side default icons click handler
 * @props footer - footer content
 */
const AppLayout = ({
  children,
  type,
  title,
  boundary,
  fullSize,
  onClick,
  footer = true,
}: AppLayoutProps) => {
  return (
    <Container type={type}>
      <Nav
        type={type}
        title={title}
        boundary={boundary}
        fullSize={fullSize}
        onClick={onClick}
      />
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
