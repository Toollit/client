import axios from 'axios';
import { API_BASE_URL } from '@/apis/endpoints';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

if (apiClient) {
  apiClient.interceptors.request.use(
    (config) => {
      if (config.method === 'get') {
        config.timeout = 12000;
      }

      return config;
    },
    (error) => {
      const code = error.code;
      const status = error.response.status;

      if (code === 'ECONNABORTED' || status === 408) {
        alert('요청이 만료되었습니다.');
      }

      return Promise.reject(error);
    },
  );
}

export { apiClient };
