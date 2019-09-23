import { ReactElement } from 'react';

export type modalType =
  | ''
  | 'lol'
  | 'mask'
  | 'payment'
  | 'refund'
  | 'refund-check'
  | 'use';

export interface PayItemType {
  name: string;
  price: number;
  item_pk: number;
  amount: number;
}

export interface ModalDataType {
  status: boolean;
  data: {
    type: modalType;
    content: string | PayItemType[];
    acceptEvent(): void;
  };
}

export interface FestivalModel {
  modalData: ModalDataType;
}
