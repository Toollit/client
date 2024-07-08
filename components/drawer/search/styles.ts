import styled from '@emotion/styled';
import Drawer from '@mui/material/Drawer';
import Link from 'next/link';

const OpenButton = styled.button`
  border: none;
  width: fit-content;
  height: fit-content;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MUIDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    background-color: rgba(232, 232, 237, 0.4);
    background: transparent;
    backdrop-filter: blur(0.2rem);
  }

  backdrop-filter: blur(0.2rem);
`;

const Container = styled.div`
  background-color: rgba(22, 22, 23, 0.88);
  height: 45vh;
  width: 100%;
`;

const Form = styled.form`
  position: relative;
  padding: 6rem 3rem 0rem 3rem;
`;

const SearchIconLayoutContainer = styled.div`
  position: absolute;
  top: 6.5rem;
`;

const SearchInput = styled.input`
  position: relative;
  height: 4.4rem;
  border: none;
  font-size: 2.4rem;
  color: #e8e8ed;
  width: 100%;
  padding: 0 3.4rem;
  font-weight: 600;
  background-color: transparent;

  &:focus {
    outline: none;
    caret-color: #e8e8ed;
  }
`;

const Description = styled.div`
  font-size: 1.4rem;
  color: #86868b;
  padding: 4rem 3rem 0rem 3.5rem;
`;

const FastLinkContainer = styled.div`
  padding: 1rem 3rem 0rem 3rem;
`;

const LinkContainer = styled.div`
  display: flex;
  padding: 0.5rem 0;
`;

const FastLink = styled(Link)`
  font-size: 1.4rem;
  color: #86868b;
`;

export {
  OpenButton,
  MUIDrawer,
  Container,
  SearchIconLayoutContainer,
  Form,
  SearchInput,
  Description,
  FastLinkContainer,
  LinkContainer,
  FastLink,
};
