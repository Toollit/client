import React, { forwardRef } from 'react';
import { FocusInput, NormalInput } from './styles';

interface InputProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  focus?: boolean;
  enterSubmit?: boolean;
}

type InputRef = React.ForwardedRef<HTMLInputElement>;

/**
 * @prop {string} type - input type
 * @prop {string} placeholder - input help text
 * @prop {string} value - input value
 * @prop {(event: React.ChangeEvent<HTMLInputElement>) => void} onChange - input handler
 * @prop {boolean} focus - input border focusing effect
 * @prop {boolean} enterSubmit - Controls the behavior of submitting to the input enter
 * */

const InputComponent = (
  {
    type = 'text',
    placeholder,
    value,
    onChange,
    focus = false,
    enterSubmit = false,
  }: InputProps,
  ref: InputRef,
) => {
  return (
    <NormalInput
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      ref={ref}
      onKeyDown={(e) => {
        !enterSubmit && e.key === 'Enter' && e.preventDefault();
      }}
      focus={focus}
    />
  );
};

const Input = forwardRef(InputComponent);

export default Input;
