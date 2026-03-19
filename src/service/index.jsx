import axios from 'axios';
import { useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';

const getToken = () => secureLocalStorage.getItem(import.meta.env.VITE_TOKEN_STORAGE_KEY) || '';
const saveToken = (token) => secureLocalStorage.setItem(import.meta.env.VITE_TOKEN_STORAGE_KEY, token);
const signOut = () => { secureLocalStorage.clear(); window.location.href = '/'; };

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
  },
});

const AUTH_ENDPOINTS = ['login', 'register', 'sendOTP', 'verifyOTP'];

let isRefreshing = false;
let refreshQueue = [];

const drainQueue = (newToken) => {
  refreshQueue.forEach((cb) => cb(newToken));
  refreshQueue = [];
};

const getRefreshUrl = () => {
  const base = (import.meta.env.VITE_APP_API_URL || '').replace(/\/$/, '');
  return `${base}/user/renew-jwt/en`;
};

const attemptRefresh = async () => {
  const res = await axios.get(getRefreshUrl(), {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (res.data?.status && res.data?.token) return res.data.token;
  throw new Error('Refresh failed');
};

const AxiosInterceptor = ({ children }) => {
  useEffect(() => {
    const reqInterceptor = (request) => {
      const token = getToken();
      if (token) request.headers.Authorization = `Bearer ${token}`;
      return request;
    };

    const errInterceptor = async (error) => {
      if (!error.response) return Promise.reject(error);

      const originalRequest = error.config;
      const isAuthEndpoint = AUTH_ENDPOINTS.some((ep) => originalRequest?.url?.includes(ep));

      if (error.response.status !== 401 || isAuthEndpoint) return Promise.reject(error);

      if (originalRequest._retry) {
        signOut();
        return new Promise(() => {});
      }

      if (!getToken()) { signOut(); return new Promise(() => {}); }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push((newToken) => {
            if (!newToken) return reject(error);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(instance(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        const newToken = await attemptRefresh();
        saveToken(newToken);
        drainQueue(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch {
        drainQueue(null);
        signOut();
        return new Promise(() => {});
      } finally {
        isRefreshing = false;
      }
    };

    const requestInterceptor = instance.interceptors.request.use(reqInterceptor, (e) => Promise.reject(e));
    const responseInterceptor = instance.interceptors.response.use((r) => r, errInterceptor);

    return () => {
      instance.interceptors.response.eject(responseInterceptor);
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return children;
};

export default instance;
export { AxiosInterceptor };
