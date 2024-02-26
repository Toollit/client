import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import ArrowDoubleRight from 'public/static/icons/arrow/keyboard_double_arrow_right.svg';

const ArrowDoubleRightIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <ArrowDoubleRight width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default ArrowDoubleRightIcon;
