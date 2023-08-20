import React from 'react';
import CloseFill0 from 'public/static/icons/close/close_FILL0_wght500.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const CloseIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <CloseFill0 width={'100%'} height={'100%'} />
      </SVGContainer>
    );
  }

  return null;
};

export default CloseIcon;
