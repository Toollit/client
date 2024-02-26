import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import ArrowBack from 'public/static/icons/arrow/arrow_back_ios_new.svg';

const ArrowBackIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <ArrowBack width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default ArrowBackIcon;
