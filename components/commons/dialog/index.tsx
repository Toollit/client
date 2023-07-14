import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import HashtagInput from '@/components/commons/hashtagInput';

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
  const placeholder = useSelector(
    (state: RootState) => state.dialog.placeholder,
  );
  const maxLength = useSelector((state: RootState) => state.dialog.maxLength);
  const selectList = useSelector((state: RootState) => state.dialog.selectList);

  const [newValue, setNewValue] = useState('');
  const [checked, setChecked] = useState<string>('');
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const skillRef = useRef<string[]>([]);

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

  const handleSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const changedValue = event.currentTarget.value;

      setChecked(changedValue);
      setNewValue(changedValue);
    },
    [],
  );

  const handleMultiSelect = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      const clickValue = (event.target as HTMLInputElement).value;

      if (clickValue === undefined) {
        return;
      }
      const isFounded = checkedList.find((v) => v === clickValue);
      const filteredValue = checkedList.filter((v) => v !== clickValue);

      const result = isFounded ? filteredValue : [...checkedList, clickValue];

      const removeEmptyStringIndex = result.indexOf('');

      // item is found
      if (removeEmptyStringIndex > -1) {
        result.splice(removeEmptyStringIndex, 1); // 2nd parameter means remove one item only
      }

      setCheckedList(result);
      setNewValue(result.toString());
    },
    [checkedList],
  );

  // handle dialog button
  const handleDialog = useCallback(
    (event: React.MouseEvent) => {
      // 완료 - 'true', 취소 - 'false', 그 외 - null
      const edit = event.currentTarget.getAttribute('data-edit') as
        | 'true'
        | 'false'
        | null;

      if (edit === 'true') {
        if (type === 'hashtag') {
          const skillsCount = skillRef.current.length;

          if (maxLength && skillsCount > maxLength) {
            return alert(`최대 ${maxLength}개까지 입력 가능합니다.`);
          }

          // skills array to string for db saving;
          const result = skillRef.current.toString();

          return dispatch(
            updateValue({ update: { category, newValue: result } }),
          );
        }

        dispatch(updateValue({ update: { category, newValue } }));
      }

      if (edit === 'false') {
        dispatch(closeDialog());
      }

      if (edit === null) {
        dispatch(closeDialog());
      }
    },
    [dispatch, type, category, newValue],
  );

  const handleCheckedMultiSelect = useCallback(
    (item: string) => {
      const isChecked = checkedList.find((v) => v === item);

      return Boolean(isChecked);
    },
    [checkedList],
  );

  // initialValue settings
  useEffect(() => {
    setNewValue(value);
    if (type === 'select') {
      setChecked(value);
    }

    if (type === 'multiSelect') {
      setCheckedList(value.split(','));
    }
  }, [open, value, type]);

  return (
    <CustomDialog open={open} onClose={handleDialog}>
      <CustomDialogTitle>{title}</CustomDialogTitle>
      <DialogContent>
        {type === 'standard' && (
          <>
            <Input
              onChange={handleChangeValue}
              value={newValue}
              placeholder={placeholder ?? ''}
            />
            {maxLength && (
              <TextCount>
                {newValue.length}/{maxLength}
              </TextCount>
            )}
          </>
        )}

        {type === 'multiline' && (
          <>
            <Textarea
              onChange={handleChangeValue}
              value={newValue}
              placeholder={placeholder ?? ''}
            />
            {maxLength && (
              <TextCount>
                {newValue.length}/{maxLength}
              </TextCount>
            )}
          </>
        )}

        {type === 'select' && (
          <FormControl>
            <RadioGroup onChange={handleSelect}>
              {selectList &&
                selectList.map((item, index) => {
                  console.log({ checked, item });
                  return (
                    <FormControlLabel
                      key={`${item}-${index}`}
                      value={item}
                      label={item}
                      control={<BpRadio />}
                      checked={checked === item}
                    />
                  );
                })}
            </RadioGroup>
          </FormControl>
        )}

        {type === 'multiSelect' && (
          <FormControl>
            <RadioGroup onClick={handleMultiSelect}>
              {selectList &&
                selectList.map((item, index) => {
                  return (
                    <FormControlLabel
                      key={`${item}-${index}`}
                      value={item}
                      label={item}
                      control={<BpRadio />}
                      checked={handleCheckedMultiSelect(item)}
                    />
                  );
                })}
            </RadioGroup>
          </FormControl>
        )}

        {type === 'hashtag' && (
          <HashtagInput
            hashtagRef={skillRef}
            hashtags={value ? [...value.split(',')] : []}
            placeholder='*Enter를 눌러 입력해 주세요.'
          />
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
