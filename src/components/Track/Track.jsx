/* eslint-disable no-undef */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-template */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import './track.scss';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  CardMedia, Container, Icon, Box, Button,
} from '@mui/material';
import DOMPurify from 'dompurify';
import { ThemeProvider } from '@emotion/react';
import customTheme from '../../themes/customTheme';

function Track({ className, tracksList, ...rest }) {
  const { id } = useParams();
  const trackFinded = tracksList.find((track) => track.id === Number(id));

  console.log('trackFinded:', trackFinded);
  if (!trackFinded) {
    return <Navigate to="/error" replace />;
  }
  const steps = trackFinded.key_stage.split('\n');
  console.log('render');
  return (
    <div
      className={`track ${className}`}
      {...rest}
    >
      <Container className="track-container" sx={{ my: 1 }}>
        <CardMedia
          className="track-img"
          component="img"
          height="140"
          image={`${trackFinded.img_card}`}
          alt="hiking image"
          title={trackFinded.name}
        />
        <h1 className="track-title"> {trackFinded.name}</h1>
        <Box sx={{ display: 'flex', textAlign: 'left', my: 1 }}>
          <Box sx={{ pr: 2, width: '50%' }}>
            <p className="track-info">
              Infos techniques:
            </p>
            <p className="track-info__key">Dénivelé positif:
              <span className="track-info__value"> {trackFinded.positive_elevation}m</span>
            </p>
            <p className="track-info__key">Dénivelé négatif:
              <span className="track-info__value"> {trackFinded.negative_elevation}m</span>
            </p>
            <p className="track-info__key">Point haut:
              <span className="track-info__value"> {trackFinded.hight_point}m</span>
            </p>
            <p className="track-info__key">Point bas:
              <span className="track-info__value"> {trackFinded.low_point}m</span>
            </p>
            <p className="track-info__key">Carte IGN:
              <span className="track-info__value"> {trackFinded.ign_card_reference}</span>
            </p>
            <p className="track-info__key">Terrain:
              <span className="track-info__value"> {trackFinded.land_type}</span>
            </p>

          </Box>
          <Box sx={{ width: '50%', mb: 2 }}>
            <Box sx={{
              display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline', mb: 2,
            }}
            >
              <Icon className="fa-solid fa-flag" sx={{ width: 24, height: 24, mx: 1 }} />
              <Icon className="fa-solid fa-map-location-dot" sx={{ width: 24, height: 24, mx: 1 }} />
            </Box>
            <p className="track-info__key">Massif:
              <span className="track-info__value"> {trackFinded.mountain}</span>
            </p>
            <p className="track-info__key">Distance:
              <span className="track-info__value"> {trackFinded.overall_length}km</span>
            </p>
            <p className="track-info__key">Difficulté:
              <span className="track-info__value"> {trackFinded.difficulty}</span>
            </p>
            <p className="track-info__key">Point de départ:
              <span className="track-info__value"> {trackFinded.starting_point}</span>
            </p>
          </Box>
        </Box>
        <p className="track-resume">Résumé</p>
        <p className="track-resume__content"> {trackFinded.resume} </p>
        <p className="track-steps">Etapes de la randonnée</p>
        {steps.map((step, index) => <p className="track-steps__content" key={step + index}>{step}</p>)}
        <div className="track-hiking-map" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(trackFinded.hiking_plan, { ALLOWED_TAGS: ['iframe'] }) }} />
        <Box sx={{ display: 'flex', mt: 2, justifyContent: 'space-around' }}>
          <ThemeProvider theme={customTheme}>
            <Link to={`/liftOff/${trackFinded.lift-Off_Id}`}>
              <Button className="track-button" variant="contained">Décollage</Button>
            </Link>
            <Button className="track-button" variant="contained">Attérissage</Button>
          </ThemeProvider>
        </Box>
      </Container>
    </div>
  );
}

Track.propTypes = {
  className: PropTypes.string,
  tracksList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      difficulty: PropTypes.string.isRequired,
      mountain: PropTypes.string.isRequired,
      positive_elevation: PropTypes.number.isRequired,
      negative_elevation: PropTypes.number.isRequired,
      overall_length: PropTypes.number.isRequired,
      img_card: PropTypes.string.isRequired,
      starting_point: PropTypes.string.isRequired,
      hiking_plan: PropTypes.string,
      resume: PropTypes.string.isRequired,
      hight_point: PropTypes.number.isRequired,
      low_point: PropTypes.number.isRequired,
    }),
  ).isRequired,

};
Track.defaultProps = {
  className: '',
};
export default React.memo(Track);
