import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import PhoneFill0 from 'public/static/icons/phone/phone_FILL0.svg';

const PhoneIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <PhoneFill0 width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );

  return null;
};

export default PhoneIcon;
