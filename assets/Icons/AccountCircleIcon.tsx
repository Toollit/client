import React from 'react';
import AccountCircleFill0 from 'public/static/icons/AccountCircleIcon/account_circle_FILL0.svg';
import AccountCircleFill1 from 'public/static/icons/AccountCircleIcon/account_circle_FILL1.svg';
import { IconProps } from './types';

const AccountCircleIcon = ({
  fill = false,
  width = 24,
  height = 24,
  color,
}: IconProps) => {
  if (!fill) {
    return <AccountCircleFill0 width={width} height={height} fill={color} />;
  }

  if (fill) {
    return <AccountCircleFill1 width={width} height={height} fill={color} />;
  }

  return null;
};

export default AccountCircleIcon;
