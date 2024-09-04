import React from 'react';
import { Button } from './ButtonLoad.styled';

interface ButtonLoadPrors {
  onClick: () => void;
}

export const ButtonLoad: React.FC<ButtonLoadPrors> = ({ onClick }) => {
  return (
    <Button type="submit" onClick={onClick}>
      Load more
    </Button>
  );
};
