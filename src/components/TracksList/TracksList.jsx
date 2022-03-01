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
        overall_lenth,
      }) => (

        <TrackCard
          key={id}
          difficulty={difficulty}
          mountain={mountain}
          name={name}
          positive_elevation={positive_elevation}
          overall_lenth={overall_lenth}
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
      overall_lenth: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
TracksList.defaultProps = {
  className: '',
};
export default React.memo(TracksList);
