import React, { useEffect } from 'react';
import { Alert as MUIAlert } from '@mui/material';
import { Container, Title, Content } from './styles';
import { useDispatch } from 'react-redux';
import { hideAlert } from '@/features/alert';

interface AlertProps {
  type: 'error' | 'warning' | 'info' | 'success' | null;
  text: string;
}

const Alert = ({ type, text }: AlertProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(hideAlert());
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch]);

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
