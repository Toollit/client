import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import Github from 'public/static/icons/social/Github.svg';

const GithubIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? <></> : Github;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default GithubIcon;
