import { ReactElement } from 'react';
import { FSShopListModel } from './festival.shop';

export type modalType =
  | ''
  | 'lol'
  | 'singer'
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
  };
}

export interface FestivalModel {
  shopList: FSShopListModel;

  modalData: ModalDataType;
}
