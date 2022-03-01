import React from 'react';
import PropTypes from 'prop-types';
import './tracksList.scss';
import TrackCard from '../TrackCard/TrackCard';

function TracksList({ className, tracksList, ...rest }) {
  return (
    <main
      className={`trackslist ${className}`}
      {...rest}
    >
      {tracksList.map(({
        id,
        difficulty,
        mountain,
        name,
        positive_elevation,
        overall_length,
        img_card,
      }) => (

        <TrackCard
          key={id}
          difficulty={difficulty}
          mountain={mountain}
          name={name}
          positive_elevation={positive_elevation}
          overall_length={overall_length}
          id={id}
          img_card={img_card}
        />
      ))}

    </main>
  );
}

TracksList.propTypes = {
  className: PropTypes.string,
  tracksList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      difficulty: PropTypes.string.isRequired,
      mountain: PropTypes.string.isRequired,
      positive_elevation: PropTypes.number.isRequired,
      overall_length: PropTypes.number.isRequired,
      img_card: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
TracksList.defaultProps = {
  className: '',
};
export default React.memo(TracksList);
