import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';
import { Box } from '@mui/material';
import {
  DeleteForeverOutlined,
  ModeEditOutlineOutlined,
  ErrorOutlineOutlined,
} from '@mui/icons-material';

const CustomMUIStyles = css`
  &.MuiPaper-root {
  }

  &.MuiDrawer-paper {
    background-color: transparent !important;
    box-shadow: none !important;
  }

  &.MuiBox-root {
    background-color: transparent;
  }
`;

const CustomDrawerStyles = () => {
  return <Global styles={CustomMUIStyles} />;
};

const OpenButton = styled.button`
  border: none;
  width: fit-content;
  height: fit-content;
  background-color: transparent;
`;

const StyledBox = styled(Box)`
  max-width: 102.4rem;
  width: 100%;
  padding: 2rem 1.5rem;
  margin: 0 auto;
`;

const Container = styled.div`
  padding: 2rem 1.5rem;
`;

const ControlButtonContainer = styled.ul`
  border-radius: 1.2rem;
  background-color: #fff;

  button {
    border-bottom: 1px solid ${(props) => props.theme.colors.border.divider};
    :nth-of-type(1) {
      border-top-left-radius: 1.2rem;
      border-top-right-radius: 1.2rem;
    }
    :nth-last-of-type(1) {
      border-bottom-left-radius: 1.2rem;
      border-bottom-right-radius: 1.2rem;
    }
  }
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  text-align: left;
  background-color: #fff;
  min-height: 6.5rem;
  width: 100%;
  padding: 1.4rem 2rem 1.2rem;
  font-size: 1.6rem;
  font-weight: 600;
  border-style: none;
`;

const DeleteIcon = styled(DeleteForeverOutlined)`
  width: 3rem;
  height: 3rem;
`;

const EditIcon = styled(ModeEditOutlineOutlined)`
  width: 3rem;
  height: 3rem;
`;

const ReportIcon = styled(ErrorOutlineOutlined)`
  width: 3rem;
  height: 3rem;
`;

const Icon = styled.div`
  margin-right: 1rem;
`;

const Text = styled.div``;

const CancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  background-color: #fff;
  width: 100%;
  margin: 0.7rem auto 0 auto;
  border-radius: 1.2rem;
  font-size: 1.5rem;
  border-style: none;
  font-weight: 500;
`;

export {
  CustomDrawerStyles,
  OpenButton,
  StyledBox,
  Container,
  ControlButtonContainer,
  ControlButton,
  Icon,
  Text,
  CancelButton,
  DeleteIcon,
  EditIcon,
  ReportIcon,
};
