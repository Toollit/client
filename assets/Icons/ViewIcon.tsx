import React from 'react';
import VisibilityFILL0 from 'public/static/icons/viewIcon/visibility_FILL0.svg';
import VisibilityFILL1 from 'public/static/icons/viewIcon/visibility_FILL1.svg';
import { IconProps } from './types';

const ViewIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return <VisibilityFILL0 width={width} height={height} />;
  }

  if (fill) {
    return <VisibilityFILL1 width={width} height={height} />;
  }

  return null;
};

export default ViewIcon;
