import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Ul } from './ImageGallery.styled';

function ImageGallery({ gallery, onClickToGallery }) {
  return (
    <Ul>
      {gallery.map(el => {
        return (
          <ImageGalleryItem
            key={el.id}
            itemData={el}
            onClikImg={onClickToGallery}
          ></ImageGalleryItem>
        );
      })}
    </Ul>
  );
}

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickToGallery: PropTypes.func.isRequired,
};

export default ImageGallery;
