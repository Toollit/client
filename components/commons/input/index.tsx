import React, { useCallback } from 'react';
import { FocusInput, NormalInput } from './styles';

interface InputProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  focus?: boolean;
}

/**
 * @prop {string} type - input type
 * @prop {string} placeholder - input 도움말
 * @prop {string} value - 값
 * @prop {(event: React.ChangeEvent<HTMLInputElement>) => void} onChange - input handler
 * @prop {boolean} focus - input border focusing 효과
 * */
const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  focus = false,
}: InputProps) => {
  const handleKeydownSubmit = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        return event.preventDefault();
      }
    },
    [],
  );

  if (focus) {
    return (
      <FocusInput
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={handleKeydownSubmit}
      />
    );
  }

  return (
    <NormalInput
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={handleKeydownSubmit}
    />
  );
};

export default Input;
