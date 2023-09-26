/* eslint-disable no-param-reassign */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const SERVER_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-origin': 'true',
  },
});

api.interceptors.request.use(
  function (config) {
    // 요청 성공 직전 호출
    const access = localStorage.getItem('accessToken');
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  function (error) {
    // 요청 에러 직전 호출
    return Promise.reject(error);
  },
);

export { api };
