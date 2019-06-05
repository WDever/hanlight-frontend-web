export interface ErrorResponse {
  code: number;
  description: string;
  message: string;
  name: string;
}

export interface ErrorModel {
  onError: boolean;
  code: number;
  message: string;
  name: string;
}
