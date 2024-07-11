import React from 'react';
import { IconProps } from '@/typings/icon';
import { SVGContainer } from '@/styles/commons';
import RadioButtonCheckedFill0 from 'public/static/icons/radio/radio_button_checked_FILL0.svg';

const RadioButtonCheckedIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? <></> : RadioButtonCheckedFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default RadioButtonCheckedIcon;
