import React from 'react';
import { DialogActions, DialogContent, TextField } from '@mui/material';
import {
  CustomDialog,
  CustomDialogTitle,
  CustomDialogCancelButton,
  CustomDialogCompleteButton,
} from './styles';

interface DialogProps {
  type: 'standard' | 'multiline' | 'select';
  open: boolean;
  handler: (event: React.MouseEvent) => void;
  title: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Dialog = ({
  type = 'standard',
  open,
  handler,
  title,
  value,
  onChange,
}: DialogProps) => {
  return (
    <CustomDialog open={open} onClose={handler}>
      <CustomDialogTitle>{title}</CustomDialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          variant='standard'
          // multiline={true}
          // defaultValue={defaultValue}
          value={value}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <CustomDialogCancelButton data-edit={false} onClick={handler}>
          취소
        </CustomDialogCancelButton>
        <CustomDialogCompleteButton data-edit={true} onClick={handler}>
          완료
        </CustomDialogCompleteButton>
      </DialogActions>
    </CustomDialog>
  );
};

export default Dialog;
