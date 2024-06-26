import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import RadioButtonCheckedFill0 from 'public/static/icons/radio/radio_button_checked_FILL0.svg';

const RadioButtonCheckedIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <RadioButtonCheckedFill0 width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );

  return null;
};

export default RadioButtonCheckedIcon;
