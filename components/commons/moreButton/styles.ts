import styled from '@emotion/styled';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Button = styled.button`
  border-style: none;
  background-color: transparent;
  padding: 0rem 0.5rem;
`;

const MoreMenu = styled(Menu)`
  .MuiList-padding {
    padding: 0;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Item = styled(MenuItem)`
  font-size: 1.4rem;
  padding: 0.5rem 2rem;
`;

export { Button, MoreMenu, ItemContainer, Item };
