import { ModalStyled, Overlay } from './Modal.styled';
import React, { useEffect } from 'react';

interface ModalProps {
  largeImage: string;
  onClick: () => void;
  onCloseModal: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  largeImage,
  onClick,
  onCloseModal,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);

  const handleOverlayClick = (e: React.MouseEvent): void => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalStyled>
        <img src={largeImage} alt="" onClick={onClick} />
      </ModalStyled>
    </Overlay>
  );
};
