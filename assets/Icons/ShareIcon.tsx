import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import ShareFill0 from 'public/static/icons/share/share_FILL0.svg';

const ShareIcon = ({
  fill = false,
  width = 24,
  height = 24,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <ShareFill0 width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );

  return null;
};

export default ShareIcon;
