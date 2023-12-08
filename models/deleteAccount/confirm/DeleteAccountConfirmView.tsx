import React from 'react';
import { Container } from './styles';

export interface DeleteAccountConfirmViewProps {}

const DeleteAccountConfirmView = ({}: DeleteAccountConfirmViewProps) => {
  return (
    <Container>
      <div>Processing...</div>
      <div>Please wait a moment.</div>
    </Container>
  );
};

export default DeleteAccountConfirmView;
