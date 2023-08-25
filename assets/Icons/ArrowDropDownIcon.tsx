import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import ArrowDropDown from 'public/static/icons/arrow/arrow_drop_down.svg';

const ArrowDropDownIcon = ({
  fill = false,
  width = 24,
  height = 24,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <ArrowDropDown width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default ArrowDropDownIcon;
