import React from 'react';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';
import MailFill0 from 'public/static/icons/mail/mail_FILL0.svg';

const MailIcon = ({
  fill = false,
  width = 24,
  height = 24,
  color,
}: IconProps) => {
  return (
    <SVGContainer width={width} height={height}>
      <MailFill0 width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );

  return null;
};

export default MailIcon;
