import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import MoreVertFill0 from 'public/static/icons/more/more_vert_FILL0.svg';

const MoreVertIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? <></> : MoreVertFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default MoreVertIcon;
