import React, { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';

interface SwiperProps {
  children: React.ReactNode;
}

const Swiper = ({ children }: SwiperProps) => {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register Swiper web component
    register();

    const shadowRoot = swiperRef.current?.shadowRoot;

    // First wrapping container
    const swiperPaginationContainer = document.createElement('div');
    swiperPaginationContainer.classList.add('swiper-pagination-container');

    // Second wrapping container
    const swiperPaginationLayoutContainer = document.createElement('div');
    swiperPaginationLayoutContainer.classList.add(
      'swiper-pagination-layout-container',
    );

    // #shadow-root inside .swiper-pagination-fraction selector
    const swiperFraction = swiperRef.current?.shadowRoot?.querySelector(
      '.swiper-pagination-fraction',
    );

    swiperFraction?.parentNode?.insertBefore(
      swiperPaginationLayoutContainer,
      swiperFraction,
    );

    swiperPaginationLayoutContainer.parentNode?.insertBefore(
      swiperPaginationContainer,
      swiperPaginationLayoutContainer,
    );

    if (!swiperFraction) {
      return;
    }

    // Wrapped in the order below
    // .swiper-pagination-container > .swiper-pagination-layout-container > .swiper-pagination-fraction
    swiperPaginationLayoutContainer.appendChild(swiperFraction);
    swiperPaginationContainer.appendChild(swiperPaginationLayoutContainer);

    if (!shadowRoot) {
      return;
    }

    /* Mac Safari swiper error - CSSStyleSheet Unhandled Runtime Error TypeError: Illegal constructor */
    /*
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
    .swiperPaginationLayoutContainer { position:relative; max-width:102.4rem; width:100%; margin:0 auto}
    .swiper-pagination-fraction {font-size:1.8rem; background: rgba(0, 0, 0, 0.2); color:#fff; width:fit-content; height:3rem; border-radius:25rem; margin-left:1rem; }
    .swiper-pagination-current {padding-left:2rem}
    .swiper-pagination-total {padding-right:2rem}
    `); 
    shadowRoot.adoptedStyleSheets.push(sheet);
    */

    const style = document.createElement('style');
    style.innerHTML = `
    .swiper-pagination-container { 
      position:relative;
      max-width:102.4rem; 
      width:100%; 
      margin:0 auto; 
    }

    .swiper-pagination-layout-container { 
      position:absolute; 
      right:0; 
      width: 8rem;
    }

    .swiper-pagination-fraction {
      font-size:1.4rem; 
      background: rgba(0, 0, 0, 0.2); 
      color:#fff !important; 
      width:fit-content !important; 
      height:2.4rem; 
      border-radius:25rem;
    }
    
    .swiper-pagination-current {
      padding-left:1.5rem
    }

    .swiper-pagination-total {
      padding-right:1.5rem
    }
    `;

    shadowRoot.appendChild(style);
  }, []);

  return (
    <>
      <swiper-container
        ref={swiperRef}
        autoplay={true}
        effect='fade'
        pagination={true}
        pagination-type='fraction'
        loop={true}
        style={{
          position: 'relative',
          maxWidth: '102.4rem',
          width: '100%',
          margin: '0 auto',
          height: '36rem',
        }}
      >
        {children}
      </swiper-container>
    </>
  );
};

export default Swiper;
