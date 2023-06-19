import React from 'react';
import VisibilityFILL0 from 'public/static/icons/view/visibility_FILL0.svg';
import VisibilityFILL1 from 'public/static/icons/view/visibility_FILL1.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const ViewIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <VisibilityFILL0 width={'100%'} height={'100%'} />
      </SVGContainer>
    );
  }

  if (fill) {
    return (
      <SVGContainer width={width} height={height}>
        <VisibilityFILL1 width={'100%'} height={'100%'} />
      </SVGContainer>
    );
  }

  return null;
};

export default ViewIcon;
