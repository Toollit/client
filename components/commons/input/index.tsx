import React from 'react';
import { StyledInput } from './styles';

interface InputProps {
  type?: 'text' | 'password';
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * focus시 border color가 바뀌는 Input
 * @param type - text 또는 password
 */
const Input = ({ type = 'text', value, placeholder, onChange }: InputProps) => {
  return (
    <StyledInput
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
