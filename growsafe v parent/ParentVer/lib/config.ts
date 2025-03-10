import axios from 'axios';
import { getToken } from './TokenManager';
const baseURL = 'http://192.168.1.101:3000/';
export const AvatarBaseURL = "https://inspiring-wescoff.41-231-54-31.plesk.page/public/users/"
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization =  `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;