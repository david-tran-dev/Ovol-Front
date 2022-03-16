/* eslint-disable import/prefer-default-export */
import apiAxios from './index';

export async function requestLogin(user, pass) {
  try {
    const response = await apiAxios.post('/login', {
      user,
      pass,
    });
    return response;
  }
  catch (err) {
    return err.response;
  }
}

export async function requestCheck(token) {
  try {
    const response = await apiAxios.post('/login/check', {}, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    return response;
  }
  catch (err) {
    return err.response;
  }
}
