export enum APIStatus {
  NONE = 'none',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export enum APIStatusWithBoolean {
  NONE = 'none',
  PENDING = 'pending',
  SUCCESS_TRUE = 'success-true',
  SUCCESS_FALSE = 'success-false',
  FAILURE = 'failure',
}

export interface Facebook {
  code: string;
}
