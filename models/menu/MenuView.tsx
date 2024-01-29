import React from 'react';
import AppLayout from '@/components/appLayout';
import Link from 'next/link';
import { Container, Icon, Item, Text, StyledList } from './styles';
import { MenuItem } from './MenuController';

export interface MenuViewProps {
  handleClose: () => void;
  menu: MenuItem[];
}

const MenuView = ({ handleClose, menu }: MenuViewProps) => {
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
