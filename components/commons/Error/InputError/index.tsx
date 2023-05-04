import React from 'react';
import { ErrorMessage } from './styles';

interface InputErrorProps {
  text: string;
}

const InputError = ({ text }: InputErrorProps) => {
  return <ErrorMessage>{text}</ErrorMessage>;
};

export default InputError;
