export enum RequestTypes {
  PUT = 'PUT',
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
}
export interface RequestParameters {
  requestType: RequestTypes;
  url: string;
  data: any;
  isRawUrl?: boolean;
  requestName?: string;
}
export enum LocalStorageKeys {
  CONNECTED_TO_WALLET_ONCE = 'CONNECTED_TO_WALLET_ONCE',
}

export enum SessionStorageKeys {
  SOME_KEY = 'SOME_KEY',
}

export interface StandardResponse {
  status: boolean;
  message: string;
  data: any;
  token?: string;
}

export enum UploadUrls {
  USER_PROFILE_IMAGE = 'user-profile-image/upload',
}



export const AuthBaseUrl = `https://auth.Skeleton.io`

export const BaseUrl = `https://base.Skeleton.io`
