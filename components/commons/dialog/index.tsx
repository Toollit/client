import React, { useCallback, useEffect, useState } from 'react';
import { DialogActions, DialogContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { close as closeDialog, updateValue } from '@/features/dialog';
import {
  CustomDialog,
  CustomDialogTitle,
  CustomDialogCancelButton,
  CustomDialogCompleteButton,
  StyledInput,
  StyledTextarea,
  TextCount,
} from './styles';

// Dialog can only be opened through dispatch.
const Dialog = () => {
  const dispatch = useDispatch();

  const type = useSelector((state: RootState) => state.dialog.type);
  const open = useSelector((state: RootState) => state.dialog.open);
  const title = useSelector((state: RootState) => state.dialog.title);
  const value = useSelector((state: RootState) => state.dialog.value);
  const maxLength = useSelector((state: RootState) => state.dialog.maxLength);

  const [text, setText] = useState('');

  const handleChangeText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const changedValue = event.currentTarget.value;

      if (maxLength) {
        if (changedValue.length > maxLength) {
          return setText(changedValue.slice(0, maxLength));
        }
      }

      setText(changedValue);
    },
    [maxLength],
  );

  const handleDialog = useCallback(
    (event: React.MouseEvent) => {
      // 완료 - 'true', 취소 - 'false', 그 외 - null
      const edit = event.currentTarget.getAttribute('data-edit') as
        | 'true'
        | 'false'
        | null;

      if (edit === 'true') {
        dispatch(updateValue({ newValue: text }));
      }

      if (edit === 'false') {
        dispatch(closeDialog());
      }

      if (edit === null) {
        dispatch(closeDialog());
      }
    },
    [dispatch, text],
  );

  // initialValue settings
  useEffect(() => {
    setText(value);
  }, [value, open]);

  return (
    <CustomDialog open={open} onClose={handleDialog}>
      <CustomDialogTitle>{title}</CustomDialogTitle>
      <DialogContent>
        {type === 'standard' && (
          <StyledInput autoFocus onChange={handleChangeText} value={text} />
        )}

        {type === 'multiline' && (
          <>
            <StyledTextarea
              autoFocus
              onChange={handleChangeText}
              value={text}
            />
            {maxLength && (
              <TextCount>
                {text.length}/{maxLength}
              </TextCount>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions>
        <CustomDialogCancelButton data-edit={false} onClick={handleDialog}>
          취소
        </CustomDialogCancelButton>
        <CustomDialogCompleteButton data-edit={true} onClick={handleDialog}>
          완료
        </CustomDialogCompleteButton>
      </DialogActions>
    </CustomDialog>
  );
};

export default Dialog;
