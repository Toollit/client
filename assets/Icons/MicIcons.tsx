import React from 'react';

type IconProps = {
  color?: string;
  width: number;
  height: number;
};

const Mic = ({ color, width, height }: IconProps) => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        height={`${height}rem`}
        viewBox='0 96 960 960'
        width={`${width}rem`}
      >
        <path
          d='M480 633q-43 0-72-30.917-29-30.916-29-75.083V276q0-41.667 29.441-70.833Q437.882 176 479.941 176t71.559 29.167Q581 234.333 581 276v251q0 44.167-29 75.083Q523 633 480 633Zm0-228Zm-30 531V800q-106-11-178-89t-72-184h60q0 91 64.288 153t155.5 62Q571 742 635.5 680 700 618 700 527h60q0 106-72 184t-178 89v136h-60Zm30-363q18 0 29.5-13.5T521 527V276q0-17-11.788-28.5Q497.425 236 480 236q-17.425 0-29.212 11.5Q439 259 439 276v251q0 19 11.5 32.5T480 573Z'
          fill={color}
        />
      </svg>
    </>
  );
};

export default Mic;
