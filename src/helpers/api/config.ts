import { AxiosRequestConfig } from 'axios';
import { environment } from '../../../environments/environment';

const baseURL = environment.apiAddress;

export const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
};
