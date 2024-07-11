import React from 'react';
import { IconProps } from '@/typings/icon';
import { SVGContainer } from '@/styles/commons';
import ErrorFill0 from 'public/static/icons/error/error_FILL0.svg';
import ErrorFill1 from 'public/static/icons/error/error_FILL1.svg';

const ErrorIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  const IconComponent = fill ? ErrorFill1 : ErrorFill0;

  return (
    <SVGContainer width={width} height={height}>
      <IconComponent width={'100%'} height={'100%'} fill={color} />
    </SVGContainer>
  );
};

export default ErrorIcon;
