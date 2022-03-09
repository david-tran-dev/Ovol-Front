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
export async function requestHikingPost(data, idLand, idLift) {
  try {
    const response = await apiAxios.post('/hiking', data, { liftOff_id: idLift }, { idLandings: idLand });
    return response;
  }
  catch (err) {
    console.log(err);
    return err.response;
  }
}
