import { status } from 'store/model';

export interface FSStatus {
  getShopListStatus: status;
  getLolTeamStatus: status;
  getMatchStatus: status;
  getSingerStatus: status;
  getFsTimetableStatus: status;
  getShopPurchaseStatus: status;
  getAdminMoneyListStatus: status;
  getMoneyStatus: status;
  getAdminBoolStatus: status;
  getReceiptListStatus: status;

  postSingerVoteStatus: status;
  postLolVoteStatus: status;
  postAdminMoneyStatus: status;
  postAdminMoneyApproveStatus: status;
  postShopPurchaseStatus: status;
  postReceiptConfirmStatus: status;
}
