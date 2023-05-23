import React from 'react';
import PersonFill0 from 'public/static/icons/person/person_FILL0.svg';
import { IconProps } from './types';

const PersonIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return <PersonFill0 width={width} height={height} />;
  }

  return null;
};

export default PersonIcon;
