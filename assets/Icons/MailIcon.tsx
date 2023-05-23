import React from 'react';
import MailFill0 from 'public/static/icons/mail/mail_FILL0.svg';
import { IconProps } from './types';

const MailIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return <MailFill0 width={width} height={height} />;
  }

  return null;
};

export default MailIcon;
