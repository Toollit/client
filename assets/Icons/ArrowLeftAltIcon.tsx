import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import ArrowLeftAlt from 'public/static/icons/arrow/arrow_left_alt.svg';

const ArrowLeftAltIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <ArrowLeftAlt width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default ArrowLeftAltIcon;
