import React from 'react';
import ArrowDropUp from 'public/static/icons/arrow/arrow_drop_up.svg';
import { IconProps } from './types';

const ArrowDropUpIcon = ({ width = 24, height = 24 }: IconProps) => {
  return <ArrowDropUp width={width} height={height} />;
};

export default ArrowDropUpIcon;
