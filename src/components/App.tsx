import { useState, useEffect, FormEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SearchBar } from './Searchbar/Searchbar.jsx';
import { ButtonLoad } from './ButtonLoad/ButtonLoad.jsx';
import { fetchImage } from './Api.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Loader } from './Loader/Loader.jsx';
import { Modal } from './Modal/Modal.jsx';

export interface Images {
  id: number;
  largeImageURL: string;
  webformatURL: string;
  alt: string;
  tags: string;
}

export const App = () => {
  const [images, setImages] = useState<Images[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalHits, setTotalHits] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isModal, setIsModal] = useState<boolean>(false);

  const handalSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;

    setQuery(
      `${Date.now()}/${
        (form.elements.namedItem('query') as HTMLInputElement).value
      }`
    );
    setImages([]);
    setPage(1);
  };

  const handalLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onOpenModal = (imageURL: string) => {
    setIsModal(true);
    setSelectedImage(imageURL);
  };

  const onCloseModal = () => {
    setIsModal(false);
    setSelectedImage('');
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        const images = await fetchImage(query.split('/')[1], page);

        if (images.hits.length === 0) {
          toast.error('Nothing was found for your image request');
        }
        setImages(prevImage => [...prevImage, ...images.hits]);
        setTotalHits(images.totalHits);
      } catch (error) {
        toast.error('Oops! Try to reload the page.');
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query, page]);

  return (
    <div className="gallary">
      <SearchBar onSubmit={handalSubmit} />
      {loading && <Loader />}
      {!error && (
        <>
          <ImageGallery images={images} onOpenModal={onOpenModal} />
        </>
      )}
      {page < Math.ceil(totalHits / 12) ? (
        <ButtonLoad onClick={handalLoadMore} />
      ) : null}
      {isModal && (
        <Modal
          largeImage={selectedImage}
          onClick={onCloseModal}
          onCloseModal={onCloseModal}
        />
      )}
      <Toaster position="top-right" />
    </div>
  );
};
