import axios from 'axios';
import { useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router';

const token = secureLocalStorage.getItem(import.meta.env.VITE_TOKEN_STORAGE_KEY);

// axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: false,
  validateStatus: (status) => {
    if (status === 401) {
      secureLocalStorage.clear();
      window.location.href = '/';
      return false;
    } else {
      return true;
    }
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
    Authorization: `Bearer ${token}`
  }
});

const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = (request) => {
      const token = secureLocalStorage.getItem(import.meta.env.VITE_TOKEN_STORAGE_KEY);
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    };

    const resInterceptor = (response) => {
      return response;
    };

    const errInterceptor = (error) => {
      if (error.response.status === 401) {
        secureLocalStorage.clear();
        navigate('/');
      }
      return Promise.reject(error);
    };

    const requestInterceptor = instance.interceptors.request.use(reqInterceptor, errInterceptor);
    const interceptor = instance.interceptors.response.use(resInterceptor, errInterceptor);
    return () => {
      instance.interceptors.response.eject(interceptor);
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return children;
};

export default instance;
export { AxiosInterceptor };
