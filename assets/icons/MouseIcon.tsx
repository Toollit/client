import React from 'react';
import { IconProps } from '@/typings/icon';
import { SVGContainer } from '@/styles/commons';
import MouseFill0 from 'public/static/icons/mouse/mouse_FILL0.svg';
import MouseFill1 from 'public/static/icons/mouse/mouse_FILL1.svg';

const MouseIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? MouseFill1 : MouseFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default MouseIcon;
