import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ENV } from '@/shared/config/environment.ts';

axios.defaults.baseURL = ENV.API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axios.get<T>(url, config).then(responseBody),
  post: <T>(url: string, body: {}, config?: AxiosRequestConfig) =>
    axios.post<T>(url, body, config).then(responseBody),
  put: <T>(url: string, body: {}, config?: AxiosRequestConfig) =>
    axios.put<T>(url, body, config).then(responseBody),
  del: <T>(url: string, config?: AxiosRequestConfig) =>
    axios.delete<T>(url, config).then(responseBody),
};

export default request;
