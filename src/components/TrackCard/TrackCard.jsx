import React from 'react';
import PropTypes from 'prop-types';
import './trackCard.scss';

// material ui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Icon } from '@mui/material';

function TrackCard({
  className,
  name,
  difficulty,
  mountain,
  overall_lenth,
  positive_elevation,
  ...rest
}) {
  return (
    <div
      className={`trackCard ${className}`}
      {...rest}
    >
      <Card sx={{ display: 'flex', my: 1 }}>
        <CardMedia
          component="img"
          sx={{ width: '33%' }}
          image="https://images.unsplash.com/photo-1554818048-3e5bf815cfd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1129&q=80"
          alt="Live from space album cover"
        />
        <Box sx={{
          display: 'flex', flexDirection: 'column', width: '100%', p: 1,
        }}
        >

          <Box sx={{
            display: 'flex', justifyContent: 'space-between',
          }}
          >
            <Typography component="h2" variant="h6">
              {name}
            </Typography>
            <Icon className="fa-solid fa-flag" sx={{ width: 24, height: 24 }} />
          </Box>
          <CardContent className="trackCard-content" sx={{ textAlign: 'left', p: 0, pb: 0 }}>
            <Typography className="trackCard-content__detail">
              Massif: {mountain}
            </Typography>
            <Typography className="trackCard-content__detail">
              Diffilcuté: {difficulty}
            </Typography>
            <Typography className="trackCard-content__detail">
              Orientation décollage: NO
            </Typography>
            <Typography className="trackCard-content__detail">
              Dénivelé positif: {positive_elevation}m
            </Typography>
            <Typography className="trackCard-content__detail">
              Longueur totale : {overall_lenth}m
            </Typography>
          </CardContent>
        </Box>
      </Card>

    </div>
  );
}

TrackCard.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  mountain: PropTypes.string.isRequired,
  positive_elevation: PropTypes.number.isRequired,
  overall_lenth: PropTypes.number.isRequired,

};
TrackCard.defaultProps = {
  className: '',
};
export default React.memo(TrackCard);
