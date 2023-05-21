import { useState, useEffect } from 'react';
import { Wrap } from 'components/App.styled.js';

import { PER_PAGE } from 'services/constants';
import * as API from '../services/api';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

function App() {
  const [searchValue, setSearchValue] = useState(''); // resesarch word

  const [gallery, setGallery] = useState([]); // array of gallery objects

  const [isLoading, setIsLoading] = useState(false); //flag shower of spiner

  const [isMore, setIsMore] = useState(false); //flag shower button of 'read-more'

  const [modalImg, setModalImg] = useState(null); // {img:refer to large img,alt:text of attribute alt}

  useEffect(() => {
    if (gallery.length === 0) window.scrollTo({ top: 0 });

    window.scrollTo({
      top: document.querySelector('body').scrollHeight,
      behavior: 'smooth',
    });
  }, [gallery]);

  // helper function for working with request api
  const requestToApi = async (searchValue, currentGallery) => {
    setIsLoading(true);
    try {
      const { reqGallery, isMoreApi } = await API.readData(
        searchValue,
        Math.floor(currentGallery.length / PER_PAGE) + 1
      );

      setGallery([...currentGallery, ...reqGallery]);
      setIsMore(isMoreApi);
      setSearchValue(searchValue);
    } catch (error) {
      console.error(error);
      setGallery([]);
      setIsMore(false);
      setSearchValue('');
    } finally {
      setIsLoading(false);
    }
  };

  // submit new word
  const handleSubmit = searchValue => {
    setSearchValue(searchValue);
    setGallery([]);
    setIsLoading(true);

    requestToApi(searchValue, []);
  };

  // press button 'read more'
  const handleMore = () => {
    requestToApi(searchValue, gallery);
  };

  // close modal window
  const closeModal = () => setModalImg(null);

  return (
    <Wrap>
      {/* modal */}
      {modalImg && (
        <Modal closeWindow={closeModal}>
          <img src={modalImg?.img} alt={modalImg?.alt} />
        </Modal>
      )}

      {/* search bar */}
      <Searchbar onSubmit={handleSubmit} isDisabled={isLoading} />
      {/* gallery list */}
      <ImageGallery
        gallery={gallery}
        onClickToGallery={modalImg => setModalImg(modalImg)}
      />
      {/* loader */}
      <Loader visible={isLoading} />
      {/* button 'Load more' */}
      {isMore && !isLoading && (
        <Button isDisabled={isLoading} onClick={handleMore} />
      )}
    </Wrap>
  );
}

export default App;
