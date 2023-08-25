import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import ArrowDoubleLeft from 'public/static/icons/arrow/keyboard_double_arrow_left.svg';

const ArrowDoubleLeftIcon = ({
  fill = false,
  width = 24,
  height = 24,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <ArrowDoubleLeft width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default ArrowDoubleLeftIcon;
