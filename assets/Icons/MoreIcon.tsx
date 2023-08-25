import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import MoreFill0 from 'public/static/icons/more/more_horiz_FILL0.svg';

const MoreIcon = ({
  fill = false,
  width = 24,
  height = 24,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <MoreFill0 width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );

  return null;
};

export default MoreIcon;
