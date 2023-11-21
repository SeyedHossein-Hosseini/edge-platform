export interface IApiGetProps {
  url: string;
  queryParams?: object;
  shouldAuth?: boolean;
}

export interface IApiPostProps {
  url: string;
  body: object;
  queryParams?: object;
  shouldAuth?: boolean;
}

export interface IApiDeleteProps {
  url: string;
  queryParams?: object;
  shouldAuth?: boolean;
}
