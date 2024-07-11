import React from 'react';
import { IconProps } from '@/typings/icon';
import { SVGContainer } from '@/styles/commons';
import LogoutFill0 from 'public/static/icons/logout/logout_FILL0.svg';

const LogoutIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? <></> : LogoutFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default LogoutIcon;
