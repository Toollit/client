import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import KeyboardArrowDownFill0 from 'public/static/icons/arrow/keyboard_arrow_down_FILL0.svg';

const ArrowDownIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? <></> : KeyboardArrowDownFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default ArrowDownIcon;
