import React from 'react';
import DensityMediumFill0 from 'public/static/icons/MenuIcon/density_medium_FILL0.svg';
import { IconProps } from './types';

const MenuIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return <DensityMediumFill0 width={width} height={height} />;
  }

  return null;
};

export default MenuIcon;
