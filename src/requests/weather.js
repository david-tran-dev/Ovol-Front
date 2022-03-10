/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const apiWeatherAxios = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
});

export async function requestWeather(lat, lon) {
  try {
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const response = await apiWeatherAxios.get(
      apiWeatherAxios.baseURL,
      {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: apiKey,
          lang: 'fr',
        },
      },
    );
    return response;
  }
  catch (err) {
    return err.response;
  }
}
