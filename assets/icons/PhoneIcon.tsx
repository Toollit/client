import React from 'react';
import { IconProps } from '@/typings/icon';
import { SVGContainer } from '@/styles/commons';
import PhoneFill0 from 'public/static/icons/phone/phone_FILL0.svg';

const PhoneIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? <></> : PhoneFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default PhoneIcon;
