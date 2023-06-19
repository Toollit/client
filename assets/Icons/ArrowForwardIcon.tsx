import React from 'react';
import ArrowForward from 'public/static/icons/arrow/arrow_forward_ios.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const ArrowForwardIcon = ({ width = 24, height = 24, color }: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <ArrowForward width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default ArrowForwardIcon;
