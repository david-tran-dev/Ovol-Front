/* eslint-disable import/prefer-default-export */
import apiAxios from './index';

export async function requestLogin(email, password) {
  try {
    const response = await apiAxios.post('/login', {
      email,
      password,
    });
    console.log('response.data', response.data);
    apiAxios.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
    localStorage.setItem('accessToken', response.data.accessToken);
    return response;
  }
  catch (err) {
    return err.response;
  }
}
