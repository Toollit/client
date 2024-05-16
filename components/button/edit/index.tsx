import React, { FC } from 'react';
import { Button } from './styles';

interface Props {
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
const EditButton: FC<Props> = ({ text, category, onClick }: Props) => {
  return <Button onClick={() => onClick(category)}>{text}</Button>;
};

export default EditButton;
