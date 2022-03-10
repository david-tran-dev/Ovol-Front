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
    let photo_landing = '';

    const lenghtPhoto = img.length;
    img.forEach((photo, index) => {
      if (index !== lenghtPhoto - 1) {
        photo_landing += `'name': '${img[index]}', 'url': '${url[index]}', `;
      }
      if (index === lenghtPhoto - 1) {
        photo_landing += `'name': '${img[index]}', 'url': '${url[index]}'`;
      }
    });
    data.photo_landing = photo_landing;
    // console.log('LA STRING PHOTO:', photo_landing);
    // data.photo_landing = `'name': '${img}', 'url': '${url}'`; // Pour 1 photo
    console.log('data', data);
    const response = await apiAxios.post('/landing', data);
    return response;
  }
  catch (err) {
    console.log(err);
    return err.response;
  }
}
