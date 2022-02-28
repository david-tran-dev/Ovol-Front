import React from 'react';
import PropTypes from 'prop-types';
import './tracksList.scss';
import TrackCard from '../TrackCard/TrackCard';

function TracksList({ className, ...rest }) {
  return (
    <div
      className={`trackslist ${className}`}
      {...rest}
    >
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
    </div>
  );
}

TracksList.propTypes = {
  className: PropTypes.string,
};
TracksList.defaultProps = {
  className: '',
};
export default React.memo(TracksList);
