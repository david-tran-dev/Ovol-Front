/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './weather.scss';
import {
  Box, Card, CardContent, Typography,
} from '@mui/material';
import { Navigate } from 'react-router-dom';
import { requestWeather } from '../requests/weather';
import Loading from '../components/Loading/Loading';
import { getWindKilometerPerHour } from '../utils/weatherConverter';

function Weather({
  className, lat, lon, ...rest
}) {
  const [weatherReport, setWeatherReport] = useState({});
  const [loading, setLoading] = useState(true);

  const {
    name, main, weather, wind, sys, coord,
  } = weatherReport;

  const getWeatherReport = async () => {
    setLoading(true);
    if (Object.values(weatherReport).length === 0) {
      const weatherResponse = await requestWeather(lat, lon);
      console.log('weatherResponse:', weatherResponse);
      if (weatherResponse.status === 200) {
        setWeatherReport(weatherResponse.data);
      }
      else {
        console.log(weatherResponse);
        Navigate('/error');
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    getWeatherReport();
  }, []);

  return (
    <>
      {loading ? <Loading />
        : (
          <Card className={`weather ${className}`} sx={{ background: 'url()' }} {...rest}>
            <CardContent>
              <Box display="flex" flexDirection="row">
                <Box p={1}>
                  <Typography className="weather-title" variant="h4" color="textPrimary">
                    {name},{sys.country}
                  </Typography>
                  <Typography variant="subtitle" color="textSecondary">
                    lat: {coord.lat}, lon: {coord.lon}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <CardContent>
              <Box display="flex" flexDirection="row-reverse">
                <Box p={0}>
                  <Typography variant="h6" color="textPrimary">
                    Temp: {main.temp}
                    <span>&#176;</span>
                    C
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <CardContent>
              <Box display="flex" flexDirection="row-reverse">
                <Box p={0}>
                  <Typography variant="body1" color="textSecondary">
                    {weather[0].description}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <CardContent>
              <Box display="flex" flexDirection="row">
                <Box p={1}>
                  <Typography variant="h6" color="textPrimary">
                    Humidité: {main.humidity} %
                  </Typography>
                </Box>
                <Box p={1}>
                  <Typography variant="h6" color="textPrimary">
                    Pression: {main.pressure} pa
                  </Typography>
                </Box>
                <Box p={1}>
                  <Typography variant="h6" color="textPrimary">
                    Vent: {getWindKilometerPerHour(wind.speed)} km/h
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
    </>
  );
}

Weather.propTypes = {
  className: PropTypes.string,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};
Weather.defaultProps = {
  className: '',
};
export default React.memo(Weather);
