import React from 'react';
import { IconProps } from '@/typings/icon';
import { SVGContainer } from '@/styles/commons';
import MenuFill0 from 'public/static/icons/menu/menu_FILL0.svg';

const MenuIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? <></> : MenuFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default MenuIcon;
