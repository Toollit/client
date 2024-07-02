import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import LockPersonIconFill0 from 'public/static/icons/security/lock_person_FILL0.svg';
import LockPersonIconFill1 from 'public/static/icons/security/lock_person_FILL1.svg';

const LockPersonIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <LockPersonIconFill0 width={'100%'} height={'100%'} fill={color} />
      </SVGContainer>
    );
  }

  if (fill) {
    return (
      <SVGContainer width={width} height={height}>
        <LockPersonIconFill1 width={'100%'} height={'100%'} fill={color} />
      </SVGContainer>
    );
  }

  return null;
};

export default LockPersonIcon;
