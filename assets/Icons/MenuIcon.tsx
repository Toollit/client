import React from 'react';
import DensityMediumFill0 from 'public/static/icons/menu/density_medium_FILL0.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const MenuIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <DensityMediumFill0 width={'100%'} height={'100%'} />
      </SVGContainer>
    );
  }

  return null;
};

export default MenuIcon;
