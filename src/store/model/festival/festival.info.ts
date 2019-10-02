export type modalType =
  | ''
  | 'lol'
  | 'singer'
  | 'payment'
  | 'refund'
  | 'refund-check'
  | 'use';

export interface PayItemType {
  shop_pk: number;
  name: string;
  price: number;
  item_pk: number;
  amount: number;
}

export interface SingerModalType {
  singerPk: number;
  name: string;
}

export interface LolModalType {
  teamPk: number;
  name: string;
}

export interface ModalDataType {
  status: boolean;
  data: {
    type: modalType;
    content: string | PayItemType[];
    singer?: SingerModalType;
    team?: LolModalType;
    shop?: { shop_pk: number; items: PayItemType[] };
    receiptItem?: number;
  };
}

export interface FSShopItemModel {
  pk: number;
  name: string;
  price: number;
}

export interface FSShopModel {
  pk: number;
  className: string;
  name: string;
  location: number;
  shopItem: FSShopItemModel[];
}

export interface FSShopListModel {
  [location: string]: FSShopModel[];
}

export interface FSLolTeamMemberModel {
  studentId: string;
  name: string;
  leader: boolean;
}

export interface FSLolTeamModel {
  pk: number;
  name: string;
  member: FSLolTeamMemberModel[];
  isVote: boolean;
  voteRatio: string;
}

export interface FSSingerModel {
  pk: number;
  name: string;
  isVote: boolean;
}

export interface FSTimetableModel {
  pk: number;
  part: number;
  detail: string;
  time: string;
}

export interface PaySalesItemModel {
  name: string;
  count: number;
  totalPrice: number;
}

export interface PaySalesModel {
  items: PaySalesItemModel[];
  totalPrice: number;
}

export interface AdminMoneyModel {
  pk: number;
  admin_pk: number;
  user_pk: string;
  user_name: string;
  amount: number;
  confirmed: boolean;
}

export interface FSUserModel {
  money: number;
  lastApproval: string;
}

export type ShopSortType = 'default' | 'popular' | 'sale';

export interface FSReciptItemModel {
  name: string;
  count: number;
  totalPrice: number;
}

export interface FSReciptModel {
  pk: number;
  shop_name: string;
  moneyBefore: number;
  moneyAfter: number;
  price: number;
  confirm: boolean;
  cancel: boolean;
  createdAt: string;
  receiptItem: FSReciptItemModel[];
}
