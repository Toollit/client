import React from 'react';
import PhoneFill0 from 'public/static/icons/phone/phone_FILL0.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const PhoneIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <PhoneFill0 width={'100%'} height={'100%'} />
      </SVGContainer>
    );
  }

  return null;
};

export default PhoneIcon;
