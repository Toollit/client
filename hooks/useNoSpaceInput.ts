import React, { useCallback, useState } from 'react';

/**
 * 공백을 허용하지 않는 input
 */
const useNoSpaceInput = (
  initialValue: null | string = null,
): [
  typeof initialValue,
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
] => {
  const [value, setValue] = useState(initialValue);

  const onChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let inputValue = event.target.value;
      const regex = /\s/gi;

      const result = inputValue.replace(regex, '');
      setValue(result);
    },
    [],
  );

  return [value, onChangeValue];
};

export default useNoSpaceInput;
