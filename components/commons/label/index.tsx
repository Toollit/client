import React from 'react';
import { StyledLabel } from './styles';

interface LabelProps {
  htmlFor: string;
  text: string;
}

const Label = ({ htmlFor, text }: LabelProps) => {
  return <StyledLabel htmlFor={htmlFor}>{text}</StyledLabel>;
};

export default Label;
