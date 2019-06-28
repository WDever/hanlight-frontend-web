export interface ErrorResponse {
  code: number;
  description: string;
  message: string;
  name: string;
}

export interface ErrorModel {
  onError: number;
  code: number;
  message: string;
  name: string;
}
