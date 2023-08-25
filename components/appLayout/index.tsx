import React from 'react';
import Nav, { NavProps } from '@/components/commons/nav';
import Alert from '@/components/commons/alert';
import { Container, Content } from './styles';

interface AppLayoutProps extends NavProps {
  children: React.ReactNode;
  hasBottomButton?: boolean;
}

const AppLayout = ({
  children,
  type,
  title,
  menu,
  boundary,
  hasBottomButton,
  onClick,
}: AppLayoutProps) => {
  return (
    <Container>
      <Nav
        type={type}
        title={title}
        menu={menu}
        boundary={boundary}
        onClick={onClick}
      />
      <Content type={type} hasBottomButton={hasBottomButton}>
        {children}
      </Content>
      <Alert />
    </Container>
  );
};

export default AppLayout;
