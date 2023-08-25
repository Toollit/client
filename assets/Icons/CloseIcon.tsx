import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import CloseFill0 from 'public/static/icons/close/close_FILL0_wght500.svg';

const CloseIcon = ({
  fill = false,
  width = 24,
  height = 24,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <CloseFill0 width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default CloseIcon;
