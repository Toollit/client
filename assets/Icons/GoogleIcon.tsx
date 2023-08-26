import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import GoogleSvg from 'public/static/icons/social/Google.svg';

const GoogleIcon = ({
  fill = false,
  width = 24,
  height = 24,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <GoogleSvg width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default GoogleIcon;
