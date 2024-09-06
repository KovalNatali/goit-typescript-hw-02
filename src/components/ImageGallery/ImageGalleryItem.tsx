import React from 'react';
import {
  ImageGalleryItemStyled,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

interface Image {
  tags: string;
  largeImageURL: string;
  webformatURL: string;
}

interface ImageGalleryItemProps {
  image: Image;

  selectedImage: (imageURL: string) => void;
}

export const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({
  image,
  selectedImage,
}) => {
  return (
    <ImageGalleryItemStyled className="gallery-item">
      <ImageGalleryItemImage
        src={image.webformatURL}
        // large={image.largeImageURL}
        alt={image.tags}
        onClick={() => selectedImage(image.largeImageURL)}
      />
    </ImageGalleryItemStyled>
  );
};
