import React from 'react';
import Nav, { NavProps } from '@/components/appLayout/nav';
import Footer from '@/components/appLayout/footer';
import Alert from '@/components/alert';
import LoadingCircularProgress from '@/components/loading';
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

      <Content hasFooter={footer}>{children}</Content>

      {footer && <Footer />}

      {/* Right bottom notification  */}
      <Alert />

      {/* Loading bar waiting for a response to a request */}
      <LoadingCircularProgress />
    </Container>
  );
};

export default AppLayout;
