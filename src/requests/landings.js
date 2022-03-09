/* eslint-disable import/prefer-default-export */
import apiAxios from './index';

export async function requestLandingsList() {
  try {
    const response = await apiAxios.get('/landing');
    return response;
  }
  catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function requestLandings(id) {
  try {
    const response = await apiAxios.get(`/landing/${id}`);
    return response;
  }
  catch (err) {
    console.log(err);
    return err.response;
  }
}
export async function requestLandingPost(data, img, url) {
  try {
    console.log({ data, img, url });
    data.photo_landing = `'name': '${img}', 'url': '${url}'`;
    console.log({ data });
    const response = await apiAxios.post('/landing', data);
    return response;
  }
  catch (err) {
    console.log(err);
    return err.response;
  }
}
