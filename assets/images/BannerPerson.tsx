import React from 'react';
import BannerPersonImg from 'public/static/images/BannerPerson.svg';
import { SVGContainer } from '@/styles/commons';

const BannerPerson = () => {
  return (
    <SVGContainer width={25} height={15}>
      <BannerPersonImg width={'100%'} height={'100%'} />
    </SVGContainer>
  );
};

export default BannerPerson;
