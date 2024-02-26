import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import PersonFill0 from 'public/static/icons/person/person_FILL0.svg';

const PersonIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <PersonFill0 width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );

  return null;
};

export default PersonIcon;
