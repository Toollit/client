import React from 'react';
import { IconProps } from '@/typings/icon';
import { SVGContainer } from '@/styles/commons';
import LockPersonFill0 from 'public/static/icons/security/lock_person_FILL0.svg';
import LockPersonFill1 from 'public/static/icons/security/lock_person_FILL1.svg';

const LockPersonIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? LockPersonFill1 : LockPersonFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default LockPersonIcon;
