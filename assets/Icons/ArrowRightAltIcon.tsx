import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import ArrowRightAlt from 'public/static/icons/arrow/arrow_right_alt.svg';

const ArrowRightAltIcon = ({
  fill = false,
  width = 24,
  height = 24,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <ArrowRightAlt width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default ArrowRightAltIcon;
