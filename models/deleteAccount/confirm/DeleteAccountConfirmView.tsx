import React, { FC } from 'react';
import { Container } from './styles';

export interface ViewProps {}

const DeleteAccountConfirmView: FC<ViewProps> = ({}) => {
  return (
    <Container>
      <div>Processing...</div>
      <div>Please wait a moment.</div>
    </Container>
  );
};

export default DeleteAccountConfirmView;
