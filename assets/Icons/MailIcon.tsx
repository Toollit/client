import React from 'react';
import MailFill0 from 'public/static/icons/mail/mail_FILL0.svg';
import { IconProps } from './types';
import { SVGContainer } from '@/styles/commons';

const MailIcon = ({ fill = false, width = 24, height = 24 }: IconProps) => {
  if (!fill) {
    return (
      <SVGContainer width={width} height={height}>
        <MailFill0 width={'100%'} height={'100%'} />
      </SVGContainer>
    );
  }

  return null;
};

export default MailIcon;
