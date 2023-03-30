import React, { useCallback, useState } from 'react';

/**
 * 공백을 허용하는 input
 */
const useInput = (
  initialValue: null | string = null,
): [
  typeof initialValue,
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
] => {
  const [value, setValue] = useState(initialValue);

  const onChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(event.target.value);
    },
    [],
  );

  return [value, onChangeValue];
};

export default useInput;
