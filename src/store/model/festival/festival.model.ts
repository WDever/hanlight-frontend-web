import {
  AdminMoneyModel,
  FSLolTeamModel,
  FSReciptModel,
  FSShopListModel,
  FSSingerModel,
  FSTimetableModel,
  FSUserModel,
  ModalDataType,
  PaySalesModel,
} from './festival.info';
import { FSStatus } from './festival.status';

export interface FestivalModel {
  shopList: FSShopListModel;
  teams: FSLolTeamModel[];
  coupleNumber: number;
  singers: FSSingerModel[];
  fsTimetable: FSTimetableModel[];
  shopPurchase: PaySalesModel;
  receiptList: FSReciptModel[];

  adminChargeList: AdminMoneyModel[];

  festivalStatus: FSStatus;

  modalData: ModalDataType;

  user: FSUserModel;
  adminBool: boolean;
}
