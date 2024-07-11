import React from 'react';
import { IconProps } from '@/typings/icon';
import { SVGContainer } from '@/styles/commons';
import ArrowForwardIOSFill0 from 'public/static/icons/arrow/arrow_forward_ios_FILL0_wght400.svg';

const ArrowForwardIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? <></> : ArrowForwardIOSFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default ArrowForwardIcon;
