import React from 'react';
import PersonFill0 from 'public/static/icons/person/person_FILL0.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const PersonIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <PersonFill0 width={'100%'} height={'100%'} />
      </SVGContainer>
    );
  }

  return null;
};

export default PersonIcon;
