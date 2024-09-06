import { ImageGalleryItem } from './ImageGalleryItem';
import { ImageGalleryList } from './ImageGalleryStyl.styled';
import { Images } from '../App';
import React from 'react';

interface ImageGalleryProps {
  images: Images[];
  onOpenModal: (imageURL: string) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onOpenModal,
}) => {
  return (
    <ImageGalleryList>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            image={image}
            selectedImage={onOpenModal}
          />
        );
      })}
    </ImageGalleryList>
  );
};
