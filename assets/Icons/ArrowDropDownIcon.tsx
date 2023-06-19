import React from 'react';
import ArrowDropDown from 'public/static/icons/arrow/arrow_drop_down.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const ArrowDropDownIcon = ({ width = 24, height = 24 }: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <ArrowDropDown width={'100%'} height={'100%'} />
    </SVGContainer>
  );
};

export default ArrowDropDownIcon;
