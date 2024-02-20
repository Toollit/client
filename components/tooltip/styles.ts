import styled from '@emotion/styled';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const TooltipBox = styled(Menu)`
  .MuiList-padding {
    padding: 0;
  }
`;

const Item = styled(MenuItem)`
  font-size: 1.4rem;
  padding: 0.5rem 2rem;
`;

const Content = styled.div`
  display: flex;
  align-items: center;

  span {
    display: flex;
    align-items: center;
  }
`;

export { TooltipBox, Item, Content };
