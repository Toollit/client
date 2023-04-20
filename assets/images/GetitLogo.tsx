import React from 'react';
import LogoImg from 'public/static/images/GetitLogo.svg';

interface Props {
  width?: number;
  height?: number;
}

const GetitLogo = ({ width = 25, height = 25 }: Props) => {
  return <LogoImg width={width} height={height} />;
};

export default GetitLogo;
