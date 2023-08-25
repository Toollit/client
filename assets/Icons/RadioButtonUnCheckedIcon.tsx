import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import RadioButtonUnCheckedFill0 from 'public/static/icons/radio/radio_button_unchecked_FILL0.svg';

const RadioButtonUnCheckedIcon = ({
  fill = false,
  width = 24,
  height = 24,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <RadioButtonUnCheckedFill0 width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );

  return null;
};

export default RadioButtonUnCheckedIcon;
