import React from 'react';
import Radio, { RadioProps } from '@mui/material/Radio';
import { BpIcon, BpCheckedIcon } from './styles';

const BpRadio = (props: RadioProps) => {
  return (
    <Radio
      disableRipple
      color='default'
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
};

export default BpRadio;
