import axios from 'axios'

import { getHostname } from '../utils/data';

const instance = axios.create({
  baseURL: `${getHostname()}127.0.0.1:3333`
});

instance.interceptors.response.use((response) => {
  if (response.data) return response.data;
  return response
}, (error) => {
  return Promise.reject(error.response.data)
});

export default instance
