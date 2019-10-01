import {
  AdminMoneyModel,
  FSLolTeamModel,
  FSShopListModel,
  FSSingerModel,
  FSTimetableModel,
  ModalDataType,
  PaySalesModel,
  FSUserModel,
} from './festival.info';
import { FSStatus } from './festival.status';

export interface FestivalModel {
  shopList: FSShopListModel;
  teams: FSLolTeamModel[];
  coupleNumber: number;
  singers: FSSingerModel[];
  fsTimetable: FSTimetableModel[];
  shopPurchase: PaySalesModel;

  adminChargeList: AdminMoneyModel[];

  festivalStatus: FSStatus;

  modalData: ModalDataType;

  user: FSUserModel;
  adminBool: boolean;
  
}