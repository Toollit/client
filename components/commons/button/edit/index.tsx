import React from 'react';
import { EditButton } from './styles';

interface EditBtnProps {
  text: string;
  category: string;
  onClick: (category: string) => void;
}

/**
 * floats the dialog for modification
 * @props text - button show text
 * @props category - update data category
 * @props onClick - edit button handler
 */

const EditBtn = ({ text, category, onClick }: EditBtnProps) => {
  return <EditButton onClick={() => onClick(category)}>{text}</EditButton>;
};

export default EditBtn;
