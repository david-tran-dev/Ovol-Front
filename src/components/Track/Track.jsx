/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import './track.scss';
import { Navigate, useParams } from 'react-router-dom';
import {
  CardMedia, Container, Icon, Typography, Box, Button,
} from '@mui/material';
import DOMPurify from 'dompurify';

function Track({ className, tracksList, ...rest }) {
  const { id } = useParams();
  const trackFinded = tracksList.find((track) => track.id === Number(id));

  console.log('trackFinded:', trackFinded);
  if (!trackFinded) {
    return <Navigate to="/error" replace />;
  }
  const steps = trackFinded.key_stage.split('\n');
  console.log('steps:', steps);
  console.log('render');
  return (
    <div
      className={`track ${className}`}
      {...rest}
    >
      <Container sx={{ my: 1 }}>
        <CardMedia
          className="track-img"
          component="img"
          height="140"
          image={`${trackFinded.img_card}`}
          alt="hiking image"
          title={trackFinded.name}
        />
        <Typography gutterBottom variant="h5" textAlign="left" fontWeight="bold"> {trackFinded.name}</Typography>
        <Box sx={{ display: 'flex', textAlign: 'left', my: 1 }}>
          <Box sx={{ pr: 2, width: '50%' }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
              Infos techniques:
            </Typography>
            <Typography className="track-info__key">Dénivelé positif:
              <Typography className="track-info__value" component="span"> {trackFinded.positive_elevation}m</Typography>
            </Typography>
            <Typography className="track-info__key">Dénivelé négatif:
              <Typography className="track-info__value" component="span"> {trackFinded.negative_elevation}m</Typography>
            </Typography>
            <Typography className="track-info__key">Point haut:
              <Typography className="track-info__value" component="span"> {trackFinded.hight_point}m</Typography>
            </Typography>
            <Typography className="track-info__key">Point bas:
              <Typography className="track-info__value" component="span"> {trackFinded.low_point}m</Typography>
            </Typography>
            <Typography className="track-info__key">Carte IGN:
              <Typography className="track-info__value" component="span"> {trackFinded.ign_card_reference}</Typography>
            </Typography>
            <Typography className="track-info__key">Terrain:
              <Typography className="track-info__value" component="span"> {trackFinded.land_type}</Typography>
            </Typography>

          </Box>
          <Box sx={{ width: '50%', mb: 2 }}>
            <Box sx={{
              display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline', mb: 2,
            }}
            >
              <Icon className="fa-solid fa-flag" sx={{ width: 24, height: 24, mx: 1 }} />
              <Icon className="fa-solid fa-map-location-dot" sx={{ width: 24, height: 24, mx: 1 }} />
            </Box>
            <Typography className="track-info__key">Massif:
              <Typography className="track-info__value" component="span"> {trackFinded.mountain}</Typography>
            </Typography>
            <Typography className="track-info__key">Point de départ:
              <Typography className="track-info__value" component="span"> {trackFinded.starting_point}</Typography>
            </Typography>
            <Typography className="track-info__key">Distance:
              <Typography className="track-info__value" component="span"> {trackFinded.overall_length}km</Typography>
            </Typography>
            <Typography className="track-info__key">Difficulté:
              <Typography className="track-info__value" component="span"> {trackFinded.difficulty}</Typography>

            </Typography>
          </Box>
        </Box>
        <Typography variant="h5" gutterBottom textAlign="left" fontWeight="bold">Résumé</Typography>
        <Typography gutterBottom textAlign="left" sx={{ mb: 2 }}> {trackFinded.resume} </Typography>
        <Typography variant="h5" gutterBottom textAlign="left" fontWeight="bold">Etapes de la randonnée</Typography>
        {steps.map((step, index) => <Typography key={step + index} textAlign="left">{step}</Typography>)}
        <div className="track-hiking-map" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(trackFinded.hiking_plan, { ALLOWED_TAGS: ['iframe'] }) }} />
        <Box sx={{ display: 'flex', mt: 2, justifyContent: 'space-around' }}>
          <Button variant="contained">Décollage</Button>
          <Button variant="contained">Attérissage</Button>
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
