/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-material-ui-carousel';
import Photo from './Photo/Photo';

function CarouselPhotos({ photos }) {
  return (
    <Carousel animation="slide">
      {photos && (
        photos.map(({ title, url }, i) => <Photo key={i + title} title={title} url={url} />)
      )}
    </Carousel>
  );
}

CarouselPhotos.propTypes = {
  photos: PropTypes.array,
};

CarouselPhotos.defaultProps = {
  photos: [],
};
export default React.memo(CarouselPhotos);
