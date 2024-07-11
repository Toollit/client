import React from 'react';
import { IconProps } from '@/typings/icon';
import { SVGContainer } from '@/styles/commons';
import Google from 'public/static/icons/social/Google.svg';

const GoogleIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? <></> : Google;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default GoogleIcon;
