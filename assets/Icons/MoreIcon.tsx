import React from 'react';
import MoreFill0 from 'public/static/icons/more/more_horiz_FILL0.svg';
import { IconProps } from './types';

const MoreIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return <MoreFill0 width={width} height={height} />;
  }

  return null;
};

export default MoreIcon;
