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
