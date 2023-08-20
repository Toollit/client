import React from 'react';
import RadioButtonCheckedFill0 from 'public/static/icons/radio/radio_button_checked_FILL0.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const RadioButtonCheckedIcon = ({
  fill = false,
  width = 24,
  height = 24,
  color,
}: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <RadioButtonCheckedFill0 width={'100%'} height={'100%'} fill={color} />
      </SVGContainer>
    );
  }

  return null;
};

export default RadioButtonCheckedIcon;