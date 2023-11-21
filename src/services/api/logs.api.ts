import { Observable } from 'rxjs';
import api from 'src/helpers/api';

const sessionLogsData = (queryParams: any): Observable<any> => {
  const call = api.get<any>({
    url: 'api/log/get_log_by_session/',
    queryParams: queryParams,
    shouldAuth: true,
  }) as Observable<any>;

  return call;
};

const detectedFacesLogsData = (queryParams: any): Observable<any> => {
  const call = api.get<any>({
    url: 'api/log_face/',
    queryParams: queryParams,
    shouldAuth: true,
  }) as Observable<any>;

  return call;
};

const detectedLicensePlatesLogsData = (queryParams: any): Observable<any> => {
  const call = api.get<any>({
    url: 'api/log_anpr/',
    queryParams: queryParams,
    shouldAuth: true,
  }) as Observable<any>;

  return call;
};

const getRestrictedLiveSessionGallery = (queryParams: any): Observable<any> => {
  return api.get<any>({
    url: 'api/log_restricted/retrieve_images/',
    queryParams: queryParams,
    shouldAuth: true,
  }) as Observable<any>;
};

const getRestrictedHistoryLogsData = (queryParams: any): Observable<any> => {
  return api.get<any>({
    url: 'api/log_restricted/',
    queryParams: queryParams,
    shouldAuth: true,
  }) as Observable<any>;
};

export {
  sessionLogsData,
  detectedFacesLogsData,
  getRestrictedLiveSessionGallery,
  getRestrictedHistoryLogsData,
  detectedLicensePlatesLogsData,
};
