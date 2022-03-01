/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import './track.scss';
import { Navigate, useParams } from 'react-router-dom';
import {
  CardMedia, Container, Icon, Typography, Box,
} from '@mui/material';

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
          component="img"
          height="140"
          image={`${trackFinded.img_card}`}
          alt="hiking image"
        />
        <Typography gutterBottom variant="h5" textAlign="left"> {trackFinded.name}</Typography>
        <Box sx={{ display: 'flex', textAlign: 'left', my: 1 }}>
          <Box sx={{ pr: 2, width: '50%' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Infos techniques:
            </Typography>
            <Typography>Dénivelé positif: {trackFinded.positive_elevation}m</Typography>
            <Typography>Dénivelé négatif: {trackFinded.negative_elevation}m</Typography>
            <Typography>Point haut: {trackFinded.hight_point}m</Typography>
            <Typography>Point bas: {trackFinded.low_point}m</Typography>
            <Typography>Carte IGN: {trackFinded.ign_card_reference}</Typography>
            <Typography>Terrain: {trackFinded.land_type}</Typography>

          </Box>
          <Box sx={{ width: '50%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Icon className="fa-solid fa-flag" sx={{ width: 24, height: 24, mx: 1 }} />
              <Icon className="fa-solid fa-map-location-dot" sx={{ width: 24, height: 24, mx: 1 }} />
            </Box>
            <Typography>Massif: {trackFinded.mountain}</Typography>
            <Typography>Point de départ: {trackFinded.starting_point}</Typography>
            <Typography>Distance: {trackFinded.overall_length}km</Typography>
            <Typography>Difficulté: {trackFinded.difficulty}</Typography>
          </Box>
        </Box>
        <Typography variant="h5" gutterBottom gutterTop textAlign="left">Résumé</Typography>
        <Typography gutterBottom textAlign="left"> {trackFinded.resume} </Typography>
        <Typography variant="h5" gutterBottom gutterTop textAlign="left">Etapes de la randonnée</Typography>
        {steps.map((step, index) => <Typography key={step + index} textAlign="left">{step}</Typography>)}

      </Container>
    </div>
  );
}

Track.propTypes = {
  className: PropTypes.string,

};
Track.defaultProps = {
  className: '',
};
export default React.memo(Track);
