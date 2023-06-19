import React from 'react';
import ShareFill0 from 'public/static/icons/share/share_FILL0.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const ShareIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <ShareFill0 width={'100%'} height={'100%'} />
      </SVGContainer>
    );
  }

  return null;
};

export default ShareIcon;
