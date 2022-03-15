/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './track.scss';
import {
  Link, useNavigate, useParams,
} from 'react-router-dom';
import {
  CardMedia, Container, Icon, Box, Button,
} from '@mui/material';
import DOMPurify from 'dompurify';
import { ThemeProvider } from '@emotion/react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import HikingIcon from '@mui/icons-material/Hiking';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GrassIcon from '@mui/icons-material/Grass';
import TerrainIcon from '@mui/icons-material/Terrain';
import Flag from '../Flag/Flag';
import customTheme from '../../themes/customTheme';
import { requestHiking } from '../../requests/hiking';
import CarouselPhotos from '../CarouselPhotos/CarouselPhotos';
import Loading from '../Loading/Loading';
import Weather from '../Weather/Weather';
import { requestLiftOff } from '../../requests/liftOff';

function Track({ className, ...rest }) {
  const [hiking, setHiking] = useState({});
  const [loading, setLoading] = useState(true);
  const [liftOff, setLiftOff] = useState({});
  const [steps, setSteps] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(async () => {
    setLoading(true);
    if (Object.keys(hiking).length === 0) {
      const response = await requestHiking(id);
      console.log('response setloadn', response);
      if (response.status === 200) {
        setHiking(response.data[0]);
      }
      else {
        navigate('/error');
      }
    }

    if (Object.keys(hiking).length > 0) {
      if (hiking.key_stage !== null) {
        setSteps(hiking.key_stage.split('\n'));
      }
      const response = await requestLiftOff(hiking.liftOff_id);
      console.log(response);
      if (response.status === 200) {
        setLiftOff(response.data[0]);
      }
      else {
        console.log(response);
        navigate('/error');
      }
      setLoading(false);
    }
  }, [hiking]);
  return (
    <>
      {!loading ? (
        <div
          className={`track ${className}`}
          {...rest}
        >
          <Container sx={{ my: 1 }}>
            <CardMedia
              className="track-img"
              component="img"
              height="140"
              image={`${hiking.img_card}`}
              alt="hiking image"
              title={hiking.name}
            />
            <h1 className="track-title"> {hiking.name}</h1>
            <ThemeProvider theme={customTheme}>
              <Box sx={{ display: 'flex', textAlign: 'left', my: 1 }}>
                <Box sx={{ pr: 2, width: '50%' }}>
                  <p className="track-info">
                    Infos techniques:
                  </p>
                  <p className="track-info__key"><TrendingUpIcon color="primary" style={{ fontSize: 15 }} /> Dénivelé positif:
                    <span className="track-info__value"> {hiking.positive_elevation}m</span>
                  </p>
                  <p className="track-info__key"><TrendingDownIcon color="primary" style={{ fontSize: 15 }} /> Dénivelé négatif:
                    <span className="track-info__value"> {hiking.negative_elevation}m</span>
                  </p>
                  <p className="track-info__key"><ExpandLessIcon color="primary" style={{ fontSize: 15 }} /> Point haut:
                    <span className="track-info__value"> {hiking.hight_point}m</span>
                  </p>
                  <p className="track-info__key"><ExpandMoreIcon color="primary" style={{ fontSize: 15 }} /> Point bas:
                    <span className="track-info__value"> {hiking.low_point}m</span>
                  </p>
                  <p className="track-info__key"><LocationOnIcon color="primary" style={{ fontSize: 15 }} /> Carte IGN:
                    <span className="track-info__value"> {hiking.ign_card_reference}</span>
                  </p>
                </Box>
                <Box sx={{ width: '50%', mb: 2 }}>
                  <Box sx={{
                    display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline', mb: 2,
                  }}
                  >
                    <Flag liftOff_id={hiking.liftOff_id} />
                    <a href={hiking.starting_point} alt={hiking.name} target="_blank" rel="noreferrer">
                      <Icon className="fa-solid fa-map-location-dot" sx={{ width: 24, height: 24, mx: 1 }} />
                    </a>
                  </Box>
                  <p className="track-info__key"><GrassIcon color="primary" style={{ fontSize: 15 }} /> Terrain:
                    <span className="track-info__value"> {hiking.land_type}</span>
                  </p>
                  <p className="track-info__key"><TerrainIcon color="primary" style={{ fontSize: 15 }} /> Massif:
                    <span className="track-info__value"> {hiking.mountain}</span>
                  </p>
                  <p className="track-info__key"><HikingIcon color="primary" style={{ fontSize: 15 }} /> Distance:
                    <span className="track-info__value"> {hiking.overall_length}km</span>
                  </p>
                  <p className="track-info__key"><QueryStatsIcon color="primary" style={{ fontSize: 15 }} /> Difficulté:
                    <span className="track-info__value"> {hiking.difficulty}</span>
                  </p>
                </Box>
              </Box>
            </ThemeProvider>
            <p className="track-resume">Résumé</p>
            <p className="track-resume__content"> {hiking.resume} </p>

            <p className="track-steps">Etapes de la randonnée</p>
            {steps.map((step, index) => <p className="track-steps__content" key={step + index}>{step}</p>)}
            <Box sx={{ display: 'flex', mt: 2, justifyContent: 'space-around' }}>
              <ThemeProvider theme={customTheme}>
                <Link className="track-link" to={`/liftoff/${hiking.liftOff_id}`}>
                  <Button className="track-button" variant="contained">Décollage</Button>
                </Link>
                <Link className="track-link" to={`/landings/${hiking.idLandings}`}>
                  <Button className="track-button" variant="contained">Attérissage</Button>
                </Link>
              </ThemeProvider>
            </Box>
            <p className="track-photos">Photos </p>
            <CarouselPhotos photos={hiking.photo_hiking} />

            <div className="track-hiking-map" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(hiking.hiking_plan, { ALLOWED_TAGS: ['iframe'] }) }} />

            <Weather lat={liftOff.latitude} lon={liftOff.longitude} />

          </Container>
        </div>
      )
        : <Loading />}
    </>
  );
}

Track.propTypes = {
  className: PropTypes.string,
};
Track.defaultProps = {
  className: '',
};
export default React.memo(Track);
