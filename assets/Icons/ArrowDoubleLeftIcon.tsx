import React from 'react';
import ArrowDoubleLeft from 'public/static/icons/arrow/keyboard_double_arrow_left.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const ArrowDoubleLeftIcon = ({ width = 24, height = 24 }: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <ArrowDoubleLeft width={'100%'} height={'100%'} />
    </SVGContainer>
  );
};

export default ArrowDoubleLeftIcon;
