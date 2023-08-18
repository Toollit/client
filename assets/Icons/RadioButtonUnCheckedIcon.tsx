import React from 'react';
import RadioButtonUnCheckedFill0 from 'public/static/icons/radio/radio_button_unchecked_FILL0.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const RadioButtonUnCheckedIcon = ({
  fill = false,
  width = 24,
  height = 24,
}: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <RadioButtonUnCheckedFill0 width={'100%'} height={'100%'} />
      </SVGContainer>
    );
  }

  return null;
};

export default RadioButtonUnCheckedIcon;
