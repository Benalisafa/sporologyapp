
import axios from 'axios'
import { store } from '../redux/store';
export const axiosInstance = axios.create({

    baseURL:"http://127.0.0.1:4000",
}) 

axiosInstance.interceptors.request.use(function (config) {
    
    config.headers.Authorization = `Bearer ${store.getState().auth.token}`

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

