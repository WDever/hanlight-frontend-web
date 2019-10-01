import {
  FSLolTeamModel,
  FSShopListModel,
  FSSingerModel,
  FSTimetableModel,
  ModalDataType,
} from './festival.info';
import { FSStatus } from './festival.status';

export interface FestivalModel {
  shopList: FSShopListModel;
  teams: FSLolTeamModel[];
  coupleNumber: number;
  singers: FSSingerModel[];
  fsTimetable: FSTimetableModel[];

  festivalStatus: FSStatus;

  modalData: ModalDataType;
}
