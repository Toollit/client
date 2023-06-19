import React from 'react';
import AccountCircleFill0 from 'public/static/icons/accountCircle/account_circle_FILL0.svg';
import AccountCircleFill1 from 'public/static/icons/accountCircle/account_circle_FILL1.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const AccountCircleIcon = ({
  fill = false,
  width = 24,
  height = 24,
  color,
}: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <AccountCircleFill0 width={'100%'} height={'100%'} fill={color} />
      </SVGContainer>
    );
  }

  if (fill) {
    return (
      <SVGContainer width={width} height={height}>
        <AccountCircleFill1 width={'100%'} height={'100%'} fill={color} />
      </SVGContainer>
    );
  }

  return null;
};

export default AccountCircleIcon;
