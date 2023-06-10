import React from 'react';
import ArrowBack from 'public/static/icons/arrow/arrow_back_ios_new.svg';
import { IconProps } from './types';

const ArrowBackIcon = ({ width = 24, height = 24, color }: IconProps) => {
  return <ArrowBack width={width} height={height} fill={color} />;
};

export default ArrowBackIcon;
