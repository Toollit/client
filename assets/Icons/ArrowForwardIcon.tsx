import React from 'react';
import ArrowForward from 'public/static/icons/arrow/arrow_forward_ios.svg';
import { IconProps } from './types';

const ArrowForwardIcon = ({ width = 24, height = 24, color }: IconProps) => {
  return <ArrowForward width={width} height={height} fill={color} />;
};

export default ArrowForwardIcon;
