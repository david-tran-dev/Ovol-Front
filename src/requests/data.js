/* eslint-disable import/prefer-default-export */
import apiAxios from './index';

export async function requestHiking() {
  try {
    const response = await apiAxios.get('/hiking');
    console.log(response);
    return response;
  }
  catch (err) {
    console.log(err);
    return err.response;
  }
}
