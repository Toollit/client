import React from 'react';
import ArrowDropUp from 'public/static/icons/arrow/arrow_drop_up.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const ArrowDropUpIcon = ({ width = 24, height = 24 }: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <ArrowDropUp width={'100%'} height={'100%'} />
    </SVGContainer>
  );
};

export default ArrowDropUpIcon;
