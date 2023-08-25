import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import AccountCircleFill0 from 'public/static/icons/filter/filter_list_FILL0.svg';

const FilterIcon = ({
  fill = false,
  width = 24,
  height = 24,
  color,
}: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <AccountCircleFill0 width={'100%'} height={'100%'} fill={color} />
      </SVGContainer>
    );
  }

  return null;
};

export default FilterIcon;
