import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import MailFill0 from 'public/static/icons/mail/mail_FILL0.svg';

const MailIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? <></> : MailFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default MailIcon;
