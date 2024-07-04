import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import CloseFill0 from 'public/static/icons/close/close_FILL0_wght500.svg';

const CloseIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? <></> : CloseFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default CloseIcon;
