import React from 'react';
import LogoImg from 'public/static/images/GetitLogo.svg';
import { SVGContainer } from '@/styles/commons';

interface Props {
  width?: number;
  height?: number;
}

const GetitLogo = ({ width = 2.4, height = 2.4 }: Props) => {
  return (
    <SVGContainer width={width} height={height}>
      <LogoImg width={'100%'} height={'100%'} />
    </SVGContainer>
  );
};

export default GetitLogo;
