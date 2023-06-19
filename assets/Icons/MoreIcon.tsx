import React from 'react';
import MoreFill0 from 'public/static/icons/more/more_horiz_FILL0.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const MoreIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <MoreFill0 width={'100%'} height={'100%'} />
      </SVGContainer>
    );
  }

  return null;
};

export default MoreIcon;
