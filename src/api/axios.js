import axios from 'axios';
const { REACT_APP_API_KEY, REACT_APP_USERNAME } = process.env;
const requestUrl = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api';

const instance = axios.create({
  baseURL: requestUrl,
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
    apikey: REACT_APP_API_KEY,
    username: REACT_APP_USERNAME,
  },
});

export default instance;
