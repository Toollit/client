import React from 'react';
import { Button } from './styles';

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

const EditButton = ({ text, category, onClick }: EditBtnProps) => {
  return <Button onClick={() => onClick(category)}>{text}</Button>;
};

export default EditButton;
