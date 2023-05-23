import React from 'react';
import PhoneFill0 from 'public/static/icons/phone/phone_FILL0.svg';
import { IconProps } from './types';

const PhoneIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return <PhoneFill0 width={width} height={height} />;
  }

  return null;
};

export default PhoneIcon;
