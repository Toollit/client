import React, { FC } from 'react';
import AppLayout from '@/components/appLayout';
import Link from 'next/link';
import { MenuItem } from './MenuController';
import { Container, Icon, Item, Text, StyledList } from './styles';

export interface ViewProps {
  handleClose: () => void;
  menu: MenuItem[];
}

const MenuView: FC<ViewProps> = ({ handleClose, menu }) => {
  return (
    <AppLayout
      type='close'
      handleClose={handleClose}
      title='메뉴'
      boundary={true}
      fullSize={false}
      footer={false}
    >
      <Container>
        <ul>
          {menu.map((item) => {
            return (
              <StyledList key={item.tag}>
                <Link href={item.url} onClick={item.handler}>
                  <Item>
                    <Icon>{item.icon}</Icon>
                    <Text>{item.text}</Text>
                  </Item>
                </Link>
              </StyledList>
            );
          })}
        </ul>
      </Container>
    </AppLayout>
  );
};

export default MenuView;
