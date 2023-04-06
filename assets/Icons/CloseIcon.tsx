import React from 'react';
import CloseFill0 from 'public/static/icons/CloseIcon/close_FILL0.svg';
import { IconProps } from './types';

const CloseIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return <CloseFill0 width={width} height={height} />;
  }

  return null;
};

export default CloseIcon;
