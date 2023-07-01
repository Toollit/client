import React, { useCallback, useEffect, useState } from 'react';
import { DialogActions, DialogContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { close as closeDialog, update as updateValue } from '@/features/dialog';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import BpRadio from '@/components/commons/radio';
import {
  CustomDialog,
  CustomDialogTitle,
  CustomDialogCancelButton,
  CustomDialogCompleteButton,
  Input,
  Textarea,
  TextCount,
  FormControlLabel,
} from './styles';

/**
 * Dialog can only be opened through dispatch.
 */
const Dialog = () => {
  const dispatch = useDispatch();

  const open = useSelector((state: RootState) => state.dialog.open);
  const type = useSelector((state: RootState) => state.dialog.type);
  const category = useSelector((state: RootState) => state.dialog.category);
  const title = useSelector((state: RootState) => state.dialog.title);
  const value = useSelector((state: RootState) => state.dialog.value);
  const maxLength = useSelector((state: RootState) => state.dialog.maxLength);
  const selectList = useSelector((state: RootState) => state.dialog.selectList);

  const [newValue, setNewValue] = useState('');

  const handleChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const changedValue = event.currentTarget.value;

      if (maxLength && changedValue.length > maxLength) {
        return setNewValue(changedValue.slice(0, maxLength));
      }

      setNewValue(changedValue);
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
        dispatch(updateValue({ update: { category, newValue } }));
      }

      if (edit === 'false') {
        dispatch(closeDialog());
      }

      if (edit === null) {
        dispatch(closeDialog());
      }
    },
    [dispatch, category, newValue],
  );

  // initialValue settings
  useEffect(() => {
    setNewValue(value);
  }, [value, open]);

  return (
    <CustomDialog open={open} onClose={handleDialog}>
      <CustomDialogTitle>{title}</CustomDialogTitle>
      <DialogContent>
        {type === 'standard' && (
          <>
            <Input autoFocus onChange={handleChangeValue} value={newValue} />
            {maxLength && (
              <TextCount>
                {newValue.length}/{maxLength}
              </TextCount>
            )}
          </>
        )}

        {type === 'multiline' && (
          <>
            <Textarea autoFocus onChange={handleChangeValue} value={newValue} />
            {maxLength && (
              <TextCount>
                {newValue.length}/{maxLength}
              </TextCount>
            )}
          </>
        )}
        {type === 'select' && (
          <FormControl>
            <RadioGroup onChange={handleChangeValue}>
              {selectList &&
                selectList.map((value, index) => {
                  return (
                    <FormControlLabel
                      key={`${value}-${index}`}
                      value={value}
                      label={value}
                      control={<BpRadio />}
                    />
                  );
                })}
            </RadioGroup>
          </FormControl>
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
