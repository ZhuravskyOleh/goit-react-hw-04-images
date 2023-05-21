import PropTypes from 'prop-types';

import { Li } from './ImageGalleryItem.styled';

function ImageGalleryItem({ itemData, onClikImg }) {
  const { tags, webformatURL, largeImageURL } = itemData;
  return (
    <Li>
      <img
        onClick={() => onClikImg({ img: largeImageURL, alt: tags })}
        src={webformatURL}
        alt={tags}
      />
    </Li>
  );
}

ImageGalleryItem.propTypes = {
  itemData: PropTypes.object.isRequired,
  onClikImg: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
