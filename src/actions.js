import axios from './lib/axios.js';

export const API_HEALTHCHECK = () => {
  axios.get('/');
};

export const ROOM_CREATE = async () => {
  return axios.get('/attendance');
};

export const ROOM_FETCH = async id => {
  return axios.get(`/attendance/${id}`);
};

export const MESSAGE_POST = async (data, id) => {
  return axios.post(`/attendance/${id}`, data);
};
 