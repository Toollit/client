import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import ArrowDropUp from 'public/static/icons/arrow/arrow_drop_up.svg';

const ArrowDropUpIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <ArrowDropUp width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default ArrowDropUpIcon;
