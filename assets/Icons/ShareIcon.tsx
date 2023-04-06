import React from 'react';
import ShareFill0 from 'public/static/icons/share/share_FILL0.svg';
import { IconProps } from './types';

const ShareIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return <ShareFill0 width={width} height={height} />;
  }

  return null;
};

export default ShareIcon;
