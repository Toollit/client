import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import ArrowForward from 'public/static/icons/arrow/arrow_forward_ios.svg';

const ArrowForwardIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <ArrowForward width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default ArrowForwardIcon;
