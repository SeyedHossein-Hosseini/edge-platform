import { map } from 'rxjs/operators';
import { defer, Observable } from 'rxjs';

import { IApiGetProps, IApiPostProps, IApiDeleteProps } from './api.interface';
import initializeAxios from './axios-setup';
import { axiosRequestConfiguration } from './config';
import { localStore } from 'src/helpers/storage-helper';

const axiosInstance = initializeAxios(axiosRequestConfiguration);

const get = <T>({ url, queryParams, shouldAuth = false }: IApiGetProps): Observable<T> => {
  return defer(() => axiosInstance.get<T>(url, {
    params: queryParams,
    ...(shouldAuth && {
      headers: { Authorization: `Bearer ${localStore.get('token')}` },
    }),
  })).pipe(
      map((result) => result.data)
  );
};

const post = <T>({
  url,
  body,
  queryParams,
  shouldAuth = false,
}: IApiPostProps): Observable<T | void> => {
  return defer(() =>
    axiosInstance.post<T>(url, body, {
      params: queryParams,
      ...(shouldAuth && {
        headers: { Authorization: `Bearer ${localStore.get('token')}` },
      }),
    }),
  ).pipe(map((result) => result.data));
};

const put = <T>({
  url,
  body,
  queryParams,
  shouldAuth = false,
}: IApiPostProps): Observable<T | void> => {
  return defer(() =>
    axiosInstance.put<T>(url, body, {
      params: queryParams,
      ...(shouldAuth && {
        headers: { Authorization: `Bearer ${localStore.get('token')}` },
      }),
    })
  ).pipe(map((result) => result.data));
};

const patch = <T>({
  url,
  body,
  queryParams,
  shouldAuth = false,
}: IApiPostProps): Observable<T | void> => {
  return defer(() =>
    axiosInstance.patch<T>(url, body, {
      params: queryParams,
      ...(shouldAuth && {
        headers: { Authorization: `Bearer ${localStore.get('token')}` },
      }),
    })
  ).pipe(map((result) => result.data));
};

const deleteR = <T>({
  url,
  queryParams,
  shouldAuth = false,
}: IApiDeleteProps): Observable<T | void> => {
  return defer(() => axiosInstance.delete(url, {
    params: queryParams,
    ...(shouldAuth && {
      headers: { Authorization: `Bearer ${localStore.get('token')}` },
    }),
  })).pipe(
      map((result) => result.data)
  );
};

export default { get, post, put, patch, delete: deleteR };
