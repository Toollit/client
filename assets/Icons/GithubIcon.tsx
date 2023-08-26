import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import GithubSvg from 'public/static/icons/social/Github.svg';

const GithubIcon = ({
  fill = false,
  width = 24,
  height = 24,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <GithubSvg width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default GithubIcon;
