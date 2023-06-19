import React from 'react';
import ArrowBack from 'public/static/icons/arrow/arrow_back_ios_new.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const ArrowBackIcon = ({ width = 24, height = 24, color }: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <ArrowBack width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default ArrowBackIcon;
