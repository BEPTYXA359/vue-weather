import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(new Error('Сетевая ошибка. Проверьте подключение к интернету.'));
    }
    return Promise.reject(error);
  },
);
