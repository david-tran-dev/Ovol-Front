/* eslint-disable import/prefer-default-export */
import apiAxios from './index';

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
