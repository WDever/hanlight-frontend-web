import { status } from 'store/model';

export interface FSStatus {
  getShopListStatus: status;
  getLolTeamStatus: status;
  getMatchStatus: status;
  getSingerStatus: status;
  getFsTimetableStatus: status;
  getShopPurchaseStatus: status;

  postSingerVoteStatus: status;
  postLolVoteStatus: status;
  postAdminMoneyStatus: status;
  getAdminMoneyListStatus: status;
  postAdminMoneyApproveStatus: status;

  getMoneyStatus: status;
  getAdminBoolStatus: status;
}
