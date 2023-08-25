import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import DensityMediumFill0 from 'public/static/icons/menu/density_medium_FILL0.svg';

const MenuIcon = ({
  fill = false,
  width = 24,
  height = 24,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <DensityMediumFill0 width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );

  return null;
};

export default MenuIcon;
