import React, { useEffect, useState } from 'react';

interface UseTimerProps {
  minutes: number;
  seconds: number;
}

/**
 * @param minutes - 타이머 분
 * @param seconds - 타이머 초
 */
const useTimer = ({ minutes, seconds }: UseTimerProps) => {
  const [min, setMin] = useState(minutes);
  const [sec, setSec] = useState(seconds);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (sec > 0) {
        setSec(sec - 1);
      }
      if (sec === 0) {
        if (min === 0) {
          clearInterval(countdown);
        } else {
          // setSec 먼저 작성 필요. setMin이 먼저 작성 시 1분에서 59초로 넘어갈때 순간 00:00이 되어서 오류가 발생된다.
          setSec(59);
          setMin(min - 1);
        }
      }
    }, 1000);

    if (min === 0 && sec === 0) {
      setMin(0);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [min, sec]);

  return {
    timer: `0${min}:${sec < 10 ? `0${sec}` : sec}`,
    leftMinutes: min,
    leftSeconds: sec,
  };
};

export default useTimer;
