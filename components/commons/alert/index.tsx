import React from 'react';
import { Alert as MUIAlert } from '@mui/material';
import { Container, Title, Content } from './styles';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

const Alert = () => {
  const type = useSelector((state: RootState) => state.alert.type);
  const text = useSelector((state: RootState) => state.alert.text);

  switch (type) {
    case 'error':
      return (
        <Container>
          <MUIAlert severity='error'>
            <Title>Error</Title>
            <Content>{text}</Content>
          </MUIAlert>
        </Container>
      );

    case 'warning':
      return (
        <Container>
          <MUIAlert severity='warning'>
            <Title>Warning</Title>
            <Content>{text}</Content>
          </MUIAlert>
        </Container>
      );

    case 'info':
      return (
        <Container>
          <MUIAlert severity='info'>
            <Title>Info</Title>
            <Content>{text}</Content>
          </MUIAlert>
        </Container>
      );

    case 'success':
      return (
        <Container>
          <MUIAlert severity='success'>
            <Title>Success</Title>
            <Content>{text}</Content>
          </MUIAlert>
        </Container>
      );

    case null:
      return null;

    default:
      break;
  }

  return null;
};

export default Alert;
