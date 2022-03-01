import axios from 'axios';

const apiAxios = axios.create({
  baseURL: 'https://apiovol.herokuapp.com/api',
});

export default apiAxios;
