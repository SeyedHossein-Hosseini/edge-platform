import { Observable } from 'rxjs';
import api from 'src/helpers/api';
import { PointsProps, SingleFrameProps } from 'src/interfaces/canvas.interface';

const getCameraList = ( queryParams?: any ): Observable<any> => {
  return api.get<any>({
    url: 'api/service/get_camera_list/',
    shouldAuth: true,
  }) as Observable<any>;
};

const savePolygonPoints = (rtspLink: string = '', points: number[][] = [] ): Observable<any> => {
  const call = api.post<any>({
    url: 'api/service/ra_polygon/',
    shouldAuth: true,
    body: {
      points: points,
      url: rtspLink,
    },
  }) as Observable<any>;
  return call;
};

const saveRestrictedAreaPolygonPoints = (rtspLink: string = '', points: number[][] = [] ): Observable<any> => {
  const call = api.post<any>({
    url: 'api/log_restricted/set_config/',
    shouldAuth: true,
    body: {
      points: points,
      stream_id: rtspLink,
    },
  }) as Observable<any>;
  return call;
};

const getPolygonsPoints = (rtspLink: string): Observable<PointsProps> => {
  const call = api.post<PointsProps>({
    url: 'api/service/ra_polygon_get/',
    shouldAuth: true,
    body: {
      url: rtspLink,
    },
  });

  return call as Observable<PointsProps>;
};

const getSingleFrame = (rtspLink: string): Observable<SingleFrameProps> => {
  const call = api.post<SingleFrameProps>({
    url: 'api/service/get_frame_camera/',
    shouldAuth: true,
    body: {
      url: rtspLink,
    },
  });

  return call as Observable<SingleFrameProps>;
};

const getRestrictedAreaSingleFrame = (streamId: string): Observable<SingleFrameProps> => {
  const call = api.get<SingleFrameProps>({
    url: 'api/log_restricted/get_frame_from_camera/',
    shouldAuth: true,
    queryParams: {
      stream_id: streamId,
    },
  });

  return call as Observable<SingleFrameProps>;
};

const getSingleFrameForFace = (queryParams?: any): Observable<SingleFrameProps> => {
  return api.get<any>({
    url: 'api/face/get_frame_from_camera/',
    queryParams,
    shouldAuth: true,
  }) as Observable<SingleFrameProps>;
};

const getFaceCamerasList = ( queryParams?: any ): Observable<any> => {
  return api.get<any>({
    url: 'api/log_face/get_available_cameras/',
    shouldAuth: true,
  }) as Observable<any>;
};


const getCsvLink = ( queryParams?: any ): Observable<any> => {
  return api.get<any>({
    url: 'api/log_face_csv/export_csv/',
    queryParams,
    shouldAuth: true,
  }) as Observable<any>;
};

const getLicensePlateCamerasList = ( queryParams?: any ): Observable<any> => {
  return api.get<any>({
    url: 'api/log_anpr/get_available_cameras/',
    shouldAuth: true,
  }) as Observable<any>;
};

const getRestrictedCamerasList = ( queryParams?: any ): Observable<any> => {
  return api.get<any>({
    url: 'api/log_restricted/get_available_cameras/',
    shouldAuth: true,
  }) as Observable<any>;
};

const getRestrictedAreaPolygonsPoints = ( streamId: string ): Observable<any> => {
  return api.get<any>({
    url: 'api/log_restricted/get_config/',
    shouldAuth: true,
    queryParams: {
      stream_id: streamId,
    },
  }) as Observable<any>;
};

export {
  getCameraList,
  savePolygonPoints,
  getPolygonsPoints,
  getSingleFrame,
  getFaceCamerasList,
  getSingleFrameForFace,
  getRestrictedCamerasList,
  getLicensePlateCamerasList,
  getRestrictedAreaSingleFrame,
  saveRestrictedAreaPolygonPoints,
  getRestrictedAreaPolygonsPoints,
  getCsvLink
};
