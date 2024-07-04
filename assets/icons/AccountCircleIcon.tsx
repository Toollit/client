import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import AccountCircleFill0 from 'public/static/icons/accountCircle/account_circle_FILL0.svg';
import AccountCircleFill1 from 'public/static/icons/accountCircle/account_circle_FILL1.svg';

const AccountCircleIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? AccountCircleFill1 : AccountCircleFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default AccountCircleIcon;
