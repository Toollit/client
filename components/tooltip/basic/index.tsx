import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { CustomTooltipStyles } from './styles';

interface BasicTooltipProps {
  text: string;
  children: React.ReactNode;
}

const BasicTooltip = ({ text, children }: BasicTooltipProps) => {
  return (
    <>
      <CustomTooltipStyles />
      <Tooltip title={text}>
        <div>{children}</div>
      </Tooltip>
    </>
  );
};
export default BasicTooltip;
