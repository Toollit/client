import React from 'react';
import ArrowDoubleRight from 'public/static/icons/arrow/keyboard_double_arrow_right.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const ArrowDoubleRightIcon = ({ width = 24, height = 24 }: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <ArrowDoubleRight width={'100%'} height={'100%'} />
    </SVGContainer>
  );
};

export default ArrowDoubleRightIcon;
