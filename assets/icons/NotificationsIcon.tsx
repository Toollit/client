import React from 'react';
import { IconProps } from '@/typings/icon';
import { SVGContainer } from '@/styles/commons';
import NotificationsFill0 from 'public/static/icons/notifications/notifications_FILL0.svg';
import NotificationsFill1 from 'public/static/icons/notifications/notifications_FILL1.svg';

const NotificationsIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? NotificationsFill1 : NotificationsFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default NotificationsIcon;
