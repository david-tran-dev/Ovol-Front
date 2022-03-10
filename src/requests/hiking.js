/* eslint-disable import/prefer-default-export */
import apiAxios from './index';

export async function requestHikingList() {
  try {
    const response = await apiAxios.get('/hiking');
    return response;
  }
  catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function requestHiking(id) {
  try {
    const response = await apiAxios.get(`/hiking/${id}`);
    return response;
  }
  catch (err) {
    console.log(err);
    return err.response;
  }
}

export async function requestHikingPost(data, img, url) {
  try {
    let photo_hiking = '';

    const lenghtPhoto = img.length;
    img.forEach((photo, index) => {
      if (index !== lenghtPhoto - 1) {
        photo_hiking += `'name': '${img[index]}', 'url': '${url[index]}', `;
      }
      if (index === lenghtPhoto - 1) {
        photo_hiking += `'name': '${img[index]}', 'url': '${url[index]}'`;
      }
    });
    data.photo_hiking = photo_hiking;
    // console.log('LA STRING PHOTO:', photo_landing);
    // data.photo_landing = `'name': '${img}', 'url': '${url}'`; // Pour 1 photo
    console.log('data', data);
    const response = await apiAxios.post('/hiking', data);
    return response;
  }
  catch (err) {
    console.log(err);
    return err.response;
  }
}
