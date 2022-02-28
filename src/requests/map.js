/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const apiAxios = axios.create({
  baseURL: 'https://apiovol.herokuapp.com/api',
});

export async function requestLanding() {
  try {
    const response = await apiAxios.get('/landing');
    return response;
  }
  catch (err) {
    console.log(err);
    return err.response;
  }
}
