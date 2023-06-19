import React from 'react';
import BannerPersonImg from 'public/static/images/BannerPerson.svg';
import { SVGContainer } from '@/styles/commons';

const BannerPerson = () => {
  return (
    <SVGContainer width={250} height={150}>
      <BannerPersonImg width={'100%'} height={'100%'} />
    </SVGContainer>
  );
};

export default BannerPerson;
