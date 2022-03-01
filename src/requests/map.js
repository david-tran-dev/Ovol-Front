/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const apiAxios = axios.create({
  baseURL: 'https://apiovol.herokuapp.com/api',
});

export async function requestLiftOff() {
  try {
    const response = await apiAxios.get('/lift-off');
    return response;
  }
  catch (err) {
    console.log(err);
    return err.response;
  }
}
