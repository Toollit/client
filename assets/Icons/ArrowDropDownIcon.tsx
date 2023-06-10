import React from 'react';
import ArrowDropDown from 'public/static/icons/arrow/arrow_drop_down.svg';
import { IconProps } from './types';

const ArrowDropDownIcon = ({ width = 24, height = 24 }: IconProps) => {
  return <ArrowDropDown width={width} height={height} />;
};

export default ArrowDropDownIcon;
