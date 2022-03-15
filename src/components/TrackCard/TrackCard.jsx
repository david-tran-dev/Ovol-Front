import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './trackCard.scss';

// material ui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { ThemeProvider } from '@emotion/react';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimerIcon from '@mui/icons-material/Timer';
import TerrainIcon from '@mui/icons-material/Terrain';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import HikingIcon from '@mui/icons-material/Hiking';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import customTheme from '../../themes/customTheme';
import { convertDurationToTime } from '../../utils/timeConverter';
import Flag from '../Flag/Flag';

function TrackCard({
  className,
  id,
  name,
  difficulty,
  mountain,
  overall_length,
  positive_elevation,
  img_card,
  favorableWind,
  duration,
}) {
  return (
    <Link
      to={`/track/${id}`}
    >
      <Card className={`trackCard ${className}`} sx={{ display: 'flex', my: 1 }}>
        <CardMedia
          component="img"
          sx={{ width: '40%' }}
          image={img_card}
          alt={name}
        />
        <Box sx={{
          display: 'flex', flexDirection: 'column', width: '100%', p: 1,
        }}
        >

          <Box sx={{
            display: 'flex', justifyContent: 'space-between',
          }}
          >
            <Typography component="h2" variant="body1" fontWeight="bold" textAlign="left">
              {name}
            </Typography>
            <Flag liftOff_id={id} />
          </Box>
          <ThemeProvider theme={customTheme}>
            <CardContent
              className="trackCard-content"
              sx={{
                textAlign: 'left',
                p: 0,
                pb: 0,
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Typography className="trackCard-content__detail">
                <TerrainIcon color="primary" style={{ fontSize: 15 }} /> Massif: {mountain}
              </Typography>
              <Typography className="trackCard-content__detail">
                <QueryStatsIcon color="primary" style={{ fontSize: 15 }} /> Difficulté: {difficulty}
              </Typography>
              <Typography className="trackCard-content__detail">
                <AssistantPhotoIcon color="primary" style={{ fontSize: 15 }} />Orientation décollage: {` ${favorableWind}`}
              </Typography>
              <Typography className="trackCard-content__detail">
                <TrendingUpIcon color="primary" style={{ fontSize: 15 }} /> Dénivelé positif: {positive_elevation}m
              </Typography>
              <Typography className="trackCard-content__detail">
                <HikingIcon color="primary" style={{ fontSize: 15 }} /> Longueur totale : {overall_length}km
              </Typography>
              <Typography className="trackCard-content__detail">
                <TimerIcon color="primary" style={{ fontSize: 15 }} /> Temps estimé : {convertDurationToTime(duration)}
              </Typography>
            </CardContent>
          </ThemeProvider>
        </Box>
      </Card>

    </Link>
  );
}

TrackCard.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  mountain: PropTypes.string.isRequired,
  positive_elevation: PropTypes.number.isRequired,
  overall_length: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  img_card: PropTypes.string.isRequired,
  favorableWind: PropTypes.array,
  duration: PropTypes.number.isRequired,
};
TrackCard.defaultProps = {
  className: '',
  favorableWind: [],
};
export default React.memo(TrackCard);
