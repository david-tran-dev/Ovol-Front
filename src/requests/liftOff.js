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

export async function requestLiftOffPost(data, img, url) {
  try {
    let photo_liftOff = '';

    const lenghtPhoto = img.length;
    img.forEach((photo, index) => {
      if (index !== lenghtPhoto - 1) {
        photo_liftOff += `'name': '${img[index]}', 'url': '${url[index]}', `;
      }
      if (index === lenghtPhoto - 1) {
        photo_liftOff += `'name': '${img[index]}', 'url': '${url[index]}'`;
      }
    });
    data.photo_liftOff = photo_liftOff;
    // console.log('LA STRING PHOTO:', photo_landing);
    // data.photo_landing = `'name': '${img}', 'url': '${url}'`; // Pour 1 photo
    console.log('data', data);
    const response = await apiAxios.post('/liftoff', data);
    return response;
  }
  catch (err) {
    console.log(err);
    return err.response;
  }
}
