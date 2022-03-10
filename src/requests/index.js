import axios from 'axios';

const apiAxios = axios.create({
  baseURL: 'https://apiovol.herokuapp.com/api',

});

export default apiAxios;

export function setBearerToken(token) {
  apiAxios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  apiAxios.defaults.headers.common.Authorization = `bearer ${token}`;
  localStorage.setItem('accessToken', token);
}

export function removeBearerToken() {
  apiAxios.defaults.headers.common.Authorization = undefined;
  localStorage.removeItem('accessToken');
}

export function getLocalBearerToken() {
  const localToken = localStorage.getItem('accessToken');
  if (localToken) {
    return localToken;
  }
  return undefined;
}
