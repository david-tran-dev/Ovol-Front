/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable space-infix-ops */
/* eslint-disable no-undef */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './liftOff.scss';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container, Box, CardMedia,
} from '@mui/material';
import { requestLiftOff } from '../../requests/liftOff';
import CarouselPhotos from '../CarouselPhotos/CarouselPhotos';
import Loading from '../Loading/Loading';
import Compass from '../Compass/Compass';

function LiftOff({ className, ...rest }) {
  const { id } = useParams();
  const [liftOff, setLiftOff] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(async () => {
    setLoading(true);
    if (!liftOff) {
      const response = await requestLiftOff(id);
      console.log('LiftOff: ', response.data[0]);
      if (response.status === 200) {
        setLiftOff(response.data[0]);
      }
      else {
        navigate('/error');
      }
    }

    setLoading(false);
  }, [liftOff]);
  return (
    <>

      {!loading
        ? (
          <div
            className={`liftOff ${className}`}
            {...rest}
          >
            <Container className="liftOff-container" sx={{ my: 1 }}>
              <CardMedia>
                <CarouselPhotos photos={liftOff.photo_liftOff} />
              </CardMedia>
              <h1 className="liftOff-title"> {liftOff.name}</h1>
              <Box sx={{ textAlign: 'left', my: 1 }}>
                <p className="liftOff-info__key">Type de terrain:
                  <span className="liftOff-info__value"> {liftOff.typeOfTerrain}</span>
                </p>
                <p className="liftOff-info__key">Latitude:
                  <span className="liftOff-info__value"> {liftOff.latitude}</span>
                </p>
                <p className="liftOff-info__key">Longitude:
                  <span className="liftOff-info__value"> {liftOff.longitude}</span>
                </p>
                <p className="liftOff-info__key">Altitude:
                  <span className="liftOff-info__value"> {liftOff.altitude}m</span>
                </p>
                <p className="liftOff-info__key">Lien FFVL:
                  <span className="liftOff-info__value">
                    <a href={liftOff.fflvLink} alt={liftOff.name} target="_blank" rel="noreferrer">
                      {` ${liftOff.fflvLink}`}
                    </a>
                  </span>
                </p>
                <p className="liftOff-info__key">Vent favorable:
                  <span className="liftOff-info__value">{liftOff.favorableWind ? ` ${liftOff.favorableWind}` : null}</span>
                </p>
                <p className="liftOff-info__key">Vent défavorable:
                  <span className="liftOff-info__value">{liftOff.unfavorableWind ? ` ${liftOff.unfavorableWind}` : null}</span>
                </p>

              </Box>
              <Box>
                <p className="liftOff-description">Description:</p>
                <p className="liftOff-description__content">{liftOff.description}</p>
                <p className="liftOff-danger">Danger: </p>
                <p className="liftOff-danger__content">{liftOff.danger}</p>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Compass favorableWind={liftOff.favorableWind} unfavorableWind={liftOff.unfavorableWind} balise={liftOff.balise} />
              </Box>

            </Container>
          </div>

        )
        : <Loading />}
    </>
  );
}

LiftOff.propTypes = {
  className: PropTypes.string,
};

LiftOff.defaultProps = {
  className: '',
};
export default React.memo(LiftOff);
