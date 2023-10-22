import { Observable } from 'rxjs';
import api from 'src/helpers/api';

const licensePlateCountPerCamera = ( queryParams?: any ): Observable<any> => {
  return api.get<any>({
    url: 'api/statistic/license_plate_count_per_camera',
    shouldAuth: true,
    ...queryParams,
  }) as Observable<any>;
};

const faceDistance = ( queryParams?: any ): Observable<any> => {
  return api.get<any>({
    url: 'api/statistic/face_distance_charts',
    shouldAuth: true,
    ...queryParams,
  }) as Observable<any>;
};

const licensePlateTimeDurationInDay = ( queryParams?: any ): Observable<any> => {
  return api.get<any>({
    url: 'api/statistic/license_plate_time_duration_in_day',
    shouldAuth: true,
    ...queryParams,
  }) as Observable<any>;
};

const dangerStatusBaseOnCamera = ( queryParams?: any ): Observable<any> => {
  return api.get<any>({
    url: 'api/statistic/danger_status_base_on_camera',
    shouldAuth: true,
    ...queryParams,
  }) as Observable<any>;
};

export {
  licensePlateTimeDurationInDay,
  licensePlateCountPerCamera,
  dangerStatusBaseOnCamera,
  faceDistance,
};
