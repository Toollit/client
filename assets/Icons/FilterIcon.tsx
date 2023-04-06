import React from 'react';
import AccountCircleFill0 from 'public/static/icons/filter/filter_list_FILL0.svg';
import { IconProps } from './types';

const FilterIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return <AccountCircleFill0 width={width} height={height} />;
  }

  return null;
};

export default FilterIcon;
