/* eslint-disable import/prefer-default-export */
import apiAxios from './index';

export async function requestLiftOffList() {
  try {
    const response = await apiAxios.get('/liftoff');
    return response;
  }
  catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function requestLiftOff(id) {
  try {
    const response = await apiAxios.get(`/liftoff/${id}`);
    return response;
  }
  catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function requestLiftOffPost(data) {
  try {
    const response = await apiAxios.post('/liftoff', data);
    return response;
  }
  catch (err) {
    console.log(err);
    return err.response;
  }
}
