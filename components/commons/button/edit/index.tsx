import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { open as openDialog } from '@/features/dialog';
import { EditButton } from './styles';

interface EditBtnProps {
  text: string;
  page: string;
  type: 'standard' | 'multiline' | 'select';
  category: string;
  title: string;
  value: string;
  maxLength?: number | null;
  selectList?: string[] | null;
  fetchFunction: () => void;
}

/**
 * floats the dialog for modification
 * @props text - button show text
 * @props page - update info page
 * @props type - dialog type 'standard' | 'multiline' | 'select'
 * @props category - update info category
 * @props title - dialog title
 * @props value - dialog value
 * @props onClick - handling dialog action
 * @props maxLength - limit length
 * @props selectList - selectList necessary if dialog type is 'select'
 */

const EditBtn = ({
  text,
  page,
  type,
  category,
  title,
  value,
  maxLength,
  selectList,
  fetchFunction,
}: EditBtnProps) => {
  const dispatch = useDispatch();

  const handleEdit = useCallback(() => {
    if (type === 'standard') {
      return dispatch(
        openDialog({
          page,
          type,
          category,
          title,
          value,
          maxLength,
        }),
      );
    }

    if (type === 'multiline') {
      return dispatch(
        openDialog({
          page,
          type,
          category,
          title,
          value,
          maxLength,
        }),
      );
    }

    if (type === 'select') {
      return dispatch(
        openDialog({
          page,
          type,
          category,
          title,
          value,
          selectList,
        }),
      );
    }
  }, [dispatch, page, type, category, title, value, maxLength, selectList]);

  return <EditButton onClick={handleEdit}>{text}</EditButton>;
};

export default EditBtn;
