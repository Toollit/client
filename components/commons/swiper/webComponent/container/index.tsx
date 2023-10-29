import React, { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';
import { CustomSwiperStyles } from './styles';

interface SwiperProps {
  children: React.ReactNode;
}

const Swiper = ({ children }: SwiperProps) => {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register Swiper web component
    register();

    const shadowRoot = swiperRef.current?.shadowRoot;

    const paginationFractionContainer = document.createElement('div');
    paginationFractionContainer.classList.add('paginationFractionContainer');

    const paginationElement = swiperRef.current?.shadowRoot?.querySelector(
      '.swiper-pagination-fraction',
    );

    paginationElement?.parentNode?.insertBefore(
      paginationFractionContainer,
      paginationElement,
    );

    if (!paginationElement) {
      return;
    }

    paginationFractionContainer.appendChild(paginationElement);

    if (!shadowRoot) {
      return;
    }

    const sheet = new CSSStyleSheet();

    sheet.replaceSync(`
    .paginationFractionContainer { position:relative; max-width:102.4rem; width:100%; margin:0 auto}
    .swiper-pagination-fraction {font-size:1.8rem; background: rgba(0, 0, 0, 0.2); color:#fff; width:fit-content; height:3rem; border-radius:25rem; margin-left:1rem; }
    .swiper-pagination-current {padding-left:2rem}
    .swiper-pagination-total {padding-right:2rem}
    `);

    shadowRoot.adoptedStyleSheets.push(sheet);
  }, []);

  return (
    <>
      <swiper-container
        className='swiperContainer'
        ref={swiperRef}
        autoplay={true}
        effect='fade'
        pagination-type='fraction'
        loop={true}
      >
        {children}
      </swiper-container>
      <CustomSwiperStyles />
    </>
  );
};

export default Swiper;
