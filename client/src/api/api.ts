import axios from 'axios';
import { useRecoilState } from 'recoil';
import { UserTokenState } from '../recoil/token/atom';

const SERVER_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Credentials': 'true',
  },
});

// 토큰이 저장되어 있다면 모든 요청의 헤더에 넣고 전송
const [accessToken, setAccessToken] = useRecoilState(UserTokenState);

api.interceptors.request.use(
  (config) => {
    const { token } = accessToken;
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { api };
