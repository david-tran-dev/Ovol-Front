/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable space-infix-ops */
/* eslint-disable no-undef */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import './landing.scss';
import {
  Box, CardMedia, Card,
} from '@mui/material';
import CarouselPhotos from '../../CarouselPhotos/CarouselPhotos';
import Compass from '../../Compass/Compass';

function Landing({
  className,
  name,
  description,
  typeOfTerrain,
  danger,
  fflvLink,
  latitude,
  longitude,
  favorableWind,
  unfavorableWind,
  photo_landing,
  altitude,
  ...rest
}) {
  return (

    <div
      className={`landing ${className}`}
      {...rest}
    >
      <Card className="landing-container" sx={{ my: 1 }}>
        <CardMedia>
          <CarouselPhotos photos={photo_landing} />
        </CardMedia>
        <h2 className="landing-title"> {name}</h2>
        <Box sx={{ textAlign: 'left', m: 2 }}>
          <p className="landing-info__key">Type de terrain:
            <span className="landing-info__value"> {typeOfTerrain}</span>
          </p>
          <p className="landing-info__key">Latitude:
            <span className="landing-info__value"> {latitude}</span>
          </p>
          <p className="landing-info__key">Longitude:
            <span className="landing-info__value"> {longitude}</span>
          </p>
          <p className="landing-info__key">Altitude:
            <span className="landing-info__value"> {altitude}m</span>
          </p>
          <p className="landing-info__key">Lien FFVL:
            <span className="landing-info__value">
              <a href={fflvLink} alt={name} target="_blank" rel="noreferrer">
                {` ${fflvLink}`}
              </a>
            </span>
          </p>

        </Box>
        <Box sx={{ m: 2 }}>
          <p className="landing-description">Description:</p>
          <p className="landing-description__content">{description}</p>
          <p className="landing-danger">Danger: </p>
          <p className="landing-danger__content">{danger}</p>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Compass favorableWind={favorableWind} unfavorableWind={unfavorableWind} />
        </Box>
      </Card>
    </div>
  );
}

Landing.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  typeOfTerrain: PropTypes.string.isRequired,
  danger: PropTypes.string,
  fflvLink: PropTypes.string.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  favorableWind: PropTypes.array,
  unfavorableWind: PropTypes.array,
  photo_landing: PropTypes.array.isRequired,
  altitude: PropTypes.number.isRequired,

};
Landing.defaultProps = {
  className: '',
  danger: '',
  favorableWind: '',
  unfavorableWind: '',
};
export default React.memo(Landing);
