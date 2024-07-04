import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import VisibilityFill0 from 'public/static/icons/view/visibility_FILL0.svg';
import VisibilityFill1 from 'public/static/icons/view/visibility_FILL1.svg';

const ViewIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? VisibilityFill1 : VisibilityFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default ViewIcon;
