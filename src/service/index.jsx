// @ts-nocheck
import axios from "axios";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom"; // Ensure you're importing from 'react-router-dom'

// Create axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: false,
  validateStatus: (status) => {
    if (status === 401) {
      secureLocalStorage.clear();
      window.location.href = "/"; // Redirect to login on unauthorized
      return false; // Reject this response
    }
    return true; // Accept other statuses
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
  },
});

// Axios interceptor component
const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = (request) => {
      const token = secureLocalStorage.getItem(
        import.meta.env.VITE_TOKEN_STORAGE_KEY
      );
      if (token) {
        request.headers.Authorization = `Bearer ${token}`; // Attach token if available
      }
      return request;
    };

    const errInterceptor = (error) => {
      if (error.response && error.response.status === 401) {
        secureLocalStorage.clear();
        navigate("/"); // Redirect to home or login on unauthorized
      }
      return Promise.reject(error); // Reject the error
    };

    const requestInterceptor = instance.interceptors.request.use(
      reqInterceptor,
      errInterceptor
    );
    const responseInterceptor = instance.interceptors.response.use(
      (response) => response,
      errInterceptor
    );

    // Cleanup on component unmount
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return children; // Render children components
};

export default instance; // Export axios instance
export { AxiosInterceptor }; // Export interceptor component
