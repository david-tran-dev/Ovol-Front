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

function TrackCard({ className, ...rest }) {
  return (
    <div
      className={`trackCard ${className}`}
      {...rest}
    >
      <Card sx={{ display: 'flex', my: 1 }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
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
            <Typography component="h2">
              Titre
            </Typography>
            <Icon className="fa-solid fa-flag" sx={{ width:  }} />
          </Box>
          <CardContent className="trackCard-content" sx={{ textAlign: 'left', p: 0, pb: 0 }}>
            <Typography className="trackCard-content__detail">
              Massif: Bourgogne
            </Typography>
            <Typography className="trackCard-content__detail">
              Diffilcuté: moyen
            </Typography>
            <Typography className="trackCard-content__detail">
              Orientation décollage: NO
            </Typography>
            <Typography className="trackCard-content__detail">
              Dénivelé positif: 1215m
            </Typography>
            <Typography className="trackCard-content__detail">
              Longueur totale : 6,9m
            </Typography>
          </CardContent>
        </Box>
      </Card>

    </div>
  );
}

TrackCard.propTypes = {
  className: PropTypes.string,
};
TrackCard.defaultProps = {
  className: '',
};
export default React.memo(TrackCard);
