/* eslint-disable space-infix-ops */
/* eslint-disable no-undef */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import './liftOff.scss';
import { Navigate, useParams } from 'react-router-dom';
import {
  CardMedia, Container, Box,
} from '@mui/material';

function LiftOff({ className, liftOffList, ...rest }) {
  const { id } = useParams();
  const liftOffFinded = liftOffList.find((liftOff) => liftOff.id === Number(id));
  console.log('LiftOffFinded:', liftOffFinded);
  if (!liftOffFinded) {
    return <Navigate to="/error" replace />;
  }
  console.log('render');
  return (
    <div
      className={`liftOff ${className}`}
      {...rest}
    >
      <Container className="liftOff-container" sx={{ my: 1 }}>
        <CardMedia
          className="liftOff-img"
          component="img"
          height="140"
          image={`${liftOffFinded.img_card}`}
          alt="lift-off image"
          title={liftOffFinded.name}
        />
        <h1 className="liftOff-title"> {liftOffFinded.name}</h1>
        <Box sx={{ display: 'flex', textAlign: 'left', my: 1 }}>
          <p className="liftOff-info">
            Décollage:
          </p>
          <p className="liftOff-info__key">Type de terrain:
            <span className="liftOff-info__value"> {liftOffFinded.type-of-terrain}m</span>
          </p>
          <p className="liftOff-info__key">Latitude:
            <span className="liftOff-info__value"> {liftOffFinded.latitude}m</span>
          </p>
          <p className="liftOff-info__key">Longitude:
            <span className="liftOff-info__value"> {liftOffFinded.longitude}m</span>
          </p>
          <p className="liftOff-info__key">Altitude:
            <span className="liftOff-info__value"> {liftOffFinded.altitude}m</span>
          </p>
          <p className="liftOff-info__key">Lien FFVL:
            <a href={liftOffFinded.fflv-link} alt={liftOffFinded.name}>
              <span className="liftOff-info__value">
                {liftOffFinded.fflv-link}
              </span>
            </a>
          </p>
          <p className="liftOff-info__key">Vent favorable <span>{liftOffFinded.favorable-wind}</span></p>
          <p className="liftOff-info__key">Vent défavorable <span>{liftOffFinded.unfavorable-wind}</span></p>

        </Box>
        <Box>
          <p className="liftOff-description">Description</p>
          <p className="liftOff-description__content">{liftOffFinded.description}</p>
          <p className="liftOff-danger">Danger</p>
          <p className="liftOff-danger__content">{liftOffFinded.danger}</p>
        </Box>

      </Container>
    </div>
  );
}

LiftOff.propTypes = {
  className: PropTypes.string,
  liftOffList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      // type-of-terrain: PropTypes.string.isRequired,
      // danger: PropTypes.string,
      // fflv-link: PropTypes.string.isRequired,
      // latitude:  PropTypes.number.isRequired,
      // longitude: PropTypes.number.isRequired,
      // altitude: PropTypes.number.isRequired,
      // favorable-wind: PropTypes.string.isRequired,
      // unfavorable-wind: PropTypes.string.isRequired,
    }),
  ).isRequired,

};
LiftOff.defaultProps = {
  className: '',
};
export default React.memo(LiftOff);
