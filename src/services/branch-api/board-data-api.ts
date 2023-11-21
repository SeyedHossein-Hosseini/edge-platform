import { Observable, of } from 'rxjs';
import {
  BoardDataInterface,
  CameraInfoProps,
} from 'src/entities/board-data.interface';

export const getBoardDataApi = (): Observable<BoardDataInterface[]> => {
  const sampleData: BoardDataInterface[] = [
    {
      id: 1,
      boardId: '1CD30E40-E25D-4569-99C8-79A59B9126E1',
      count: 1,
      network: 'ONLINE',
      lastActivity: '30 Dec 2020, 15:53',
      boardService: 'people counting',
    },
    {
      id: 2,
      boardId: '1CD30E40-E25D-4569-99C8-79A59B9126E2',
      count: 10,
      network: 'OFFLINE',
      lastActivity: '30 Dec 2020, 15:53',
      boardService: 'people counting',
    },
    {
      id: 3,
      boardId: '1CD30E40-E25D-4569-99C8-79A59B9126E3',
      count: 10,
      network: 'ONLINE',
      lastActivity: '30 Dec 2020, 15:53',
      boardService: 'people counting',
    },
    {
      id: 4,
      boardId: '1CD30E40-E25D-4569-99C8-79A59B9126E4',
      count: 10,
      network: 'OFFLINE',
      lastActivity: '30 Dec 2020, 15:53',
      boardService: 'people counting',
    },
  ];

  return of(sampleData);
};

export const getCameraInfoApi = ( boardId: string ): Observable<CameraInfoProps[]> => {
  const sampleData: CameraInfoProps[] = [
    {
      fps: 26.9,
      id: '1CD30E40-***-99C8-79A59B9126E5',
      boardId: '1CD30E40-E25D-4569-99C8-79A59B9126E1',
      name: 'Stairs',
      quality: 20,
      network: 'OFFLINE',
    },
    {
      fps: 15,
      id: '1CD30E40-***-99C8-79A59B9126E5',
      boardId: '1CD30E40-E25D-4569-99C8-79A59B9126E1',
      name: 'Stairs2',
      quality: 100,
      network: 'ONLINE',
    },
    {
      fps: 26.9,
      id: '1CD30E40-***-99C8-79A59B9126E5',
      boardId: '1CD30E40-E25D-4569-99C8-79A59B9126E2',
      name: 'Stairs',
      quality: 20,
      network: 'OFFLINE',
    },
    {
      fps: 15,
      id: '1CD30E40-***-99C8-79A59B9126E5',
      boardId: '1CD30E40-E25D-4569-99C8-79A59B9126E3',
      name: 'Stairs2',
      quality: 100,
      network: 'ONLINE',
    },
    {
      fps: 26.9,
      id: '1CD30E40-***-99C8-79A59B9126E5',
      boardId: '1CD30E40-E25D-4569-99C8-79A59B9126E3',
      name: 'Stairs',
      quality: 20,
      network: 'OFFLINE',
    },
    {
      fps: 15,
      id: '1CD30E40-***-99C8-79A59B9126E5',
      boardId: '1CD30E40-E25D-4569-99C8-79A59B9126E4',
      name: 'Stairs2',
      quality: 100,
      network: 'ONLINE',
    },
  ].filter((item) => item.boardId === boardId);

  return of(sampleData);
};

export const getHeatmapImage = async () => {
  const response: any = {
    image:
      'https://picsum.photos/1366/768?random=' + Math.floor(Math.random() * 10),
    heatArea: 'https://miro.medium.com/max/2732/1*YHM8bm9QvfCEAwrzDUymnQ.png',
  };

  return response;
};
