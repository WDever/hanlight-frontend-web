import { produce } from 'immer';
import { festivalActions, FestivalModel, festivalReducerActions } from 'store';
import { FSLolTeamModel, FSSingerModel } from 'store/model';

const initialState: FestivalModel = {
  shopList: {},
  teams: [],
  coupleNumber: 0,
  singers: [],
  fsTimetable: [],
  adminBool: false,
  shopPurchase: {
    items: [],
    totalPrice: 0,
  },
  adminChargeList: [],
  festivalStatus: {
    getShopListStatus: 'none',
    getLolTeamStatus: 'none',
    getMatchStatus: 'none',
    getSingerStatus: 'none',
    getFsTimetableStatus: 'none',
    getShopPurchaseStatus: 'none',

    postSingerVoteStatus: 'none',
    postLolVoteStatus: 'none',
    postAdminMoneyStatus: 'none',
    postAdminMoneyApproveStatus: 'none',

    getMoneyStatus: 'none',
    getAdminMoneyListStatus: 'none',
    getAdminBoolStatus: 'none',
  },
  modalData: {
    status: false,
    data: {
      type: '',
      content: '',
    },
  },
  user: {
    money: 0,
    lastApproval: '',
  },
};

export const festivalReducer = (
  state: FestivalModel = initialState,
  action: festivalReducerActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'GET_LOL_TEAM':
        draft.festivalStatus.getLolTeamStatus = 'pending';
        break;

      case 'GET_LOL_TEAM_SUCCESS':
        draft.festivalStatus.getLolTeamStatus = 'success';
        draft.teams = action.payload.team;
        break;

      case 'GET_LOL_TEAM_FAILURE':
        draft.festivalStatus.getLolTeamStatus = 'failure';
        break;

      case 'GET_MATCH':
        draft.festivalStatus.getMatchStatus = 'pending';
        break;

      case 'GET_MATCH_SUCCESS':
        draft.festivalStatus.getMatchStatus = 'success';
        draft.coupleNumber = action.payload.match.lotteryNumber;
        break;

      case 'GET_MATCH_FAILURE':
        draft.festivalStatus.getMatchStatus = 'failure';
        break;

      case 'GET_SINGER':
        draft.festivalStatus.getSingerStatus = 'pending';
        break;

      case 'GET_SINGER_SUCCESS':
        draft.festivalStatus.getSingerStatus = 'success';
        draft.singers = action.payload.singer;
        break;

      case 'GET_SINGER_FAILURE':
        draft.festivalStatus.getSingerStatus = 'failure';
        break;

      case 'POST_SINGER_VOTE':
        draft.festivalStatus.postSingerVoteStatus = 'pending';
        break;

      case 'POST_SINGER_VOTE_SUCCESS':
        draft.festivalStatus.postSingerVoteStatus = 'success';
        draft.singers = state.singers.map((item: FSSingerModel) => {
          if (item.pk === action.payload.vote.pk) {
            item.isVote = true;
            return item;
          }

          return item;
        });
        break;

      case 'POST_SINGER_VOTE_FAILURE':
        draft.festivalStatus.postSingerVoteStatus = 'failure';
        break;

      case 'POST_LOL_VOTE':
        draft.festivalStatus.postLolVoteStatus = 'pending';
        break;

      case 'POST_LOL_VOTE_SUCCESS':
        draft.festivalStatus.postLolVoteStatus = 'success';
        draft.teams = state.teams.map((item: FSLolTeamModel) => {
          if (item.pk === action.payload.LOLVote.team_pk) {
            item.isVote = true;
            return item;
          }

          return item;
        });
        break;

      case 'GET_FS_TIMETABLE':
        draft.festivalStatus.getFsTimetableStatus = 'pending';
        break;

      case 'GET_FS_TIMETABLE_SUCCESS':
        draft.festivalStatus.getFsTimetableStatus = 'success';
        draft.fsTimetable = action.payload.timetable;
        break;

      case 'GET_FS_TIMETABLE_FAILURE':
        draft.festivalStatus.getFsTimetableStatus = 'failure';
        break;

      case 'GET_PAY_SHOP_PURCHASE':
        draft.festivalStatus.getShopPurchaseStatus = 'pending';
        break;

      case 'GET_PAY_SHOP_PURCHASE_SUCCESS':
        draft.festivalStatus.getShopPurchaseStatus = 'success';
        console.log(draft.shopPurchase)
        draft.shopPurchase = action.payload;
        break;

      case 'GET_PAY_SHOP_PURCHASE_FAILURE':
        draft.festivalStatus.getShopPurchaseStatus = 'failure';
        break;

      case 'POST_ADMIN_MONEY':
        draft.festivalStatus.postAdminMoneyStatus = 'pending';
        break;

      case 'POST_ADMIN_MONEY_SUCCESS':
        draft.festivalStatus.postAdminMoneyStatus = 'success';
        draft.adminChargeList.push(action.payload.charge);
        break;

      case 'POST_ADMIN_MONEY_FAILURE':
        draft.festivalStatus.postAdminMoneyStatus = 'failure';
        break;

      case 'GET_ADMIN_MONEY_LIST':
        draft.festivalStatus.getAdminMoneyListStatus = 'pending';
        break;
      case 'GET_ADMIN_MONEY_LIST_SUCCESS':
        draft.festivalStatus.getAdminMoneyListStatus = 'success';
        draft.adminChargeList = action.payload.charge;
        break;
      case 'GET_ADMIN_MONEY_LIST_FAILURE':
        draft.festivalStatus.getAdminMoneyListStatus = 'failure';
        break;

      case 'TOGGLE_MODAL':
        if (action.payload.status && action.payload.data) {
          draft.modalData.status = true;
          draft.modalData.data = action.payload.data;
        } else if (!action.payload.status) {
          draft.modalData.status = false;
          draft.modalData.data = {
            type: '',
            content: '',
          };
        }
        break;

      case 'GET_MONEY':
        draft.festivalStatus.getMoneyStatus = 'pending';
        break;
      case 'GET_MONEY_SUCCESS':
        draft.festivalStatus.getMoneyStatus = 'success';
        draft.user = action.payload.user;
        break;
      case 'GET_MONEY_FAILURE':
        draft.festivalStatus.getMoneyStatus = 'failure';
        break;
      
      case 'GET_ADMIN_BOOL':
        draft.festivalStatus.getAdminBoolStatus = 'pending';
        break;

      case 'GET_ADMIN_BOOL_SUCCESS':
        draft.festivalStatus.getAdminBoolStatus = 'success';
        draft.adminBool = action.payload.adminBool;
        break;
      case 'GET_ADMIN_BOOL_FAILURE':
        draft.festivalStatus.getAdminBoolStatus = 'failure';
        break;

      case 'POST_ADMIN_MONEY_APPROVE':
        draft.festivalStatus.postAdminMoneyApproveStatus = 'pending';
        break;
      case 'POST_ADMIN_MONEY_APPROVE_SUCCESS':
        draft.festivalStatus.postAdminMoneyApproveStatus = 'success';
        draft.adminChargeList = draft.adminChargeList.filter(v => v.pk !== action.payload.charge_pk);
        
        break;
      case 'POST_ADMIN_MONEY_APPROVE_FAILURE':
        draft.festivalStatus.postAdminMoneyApproveStatus = 'failure';
        break;
        
      default:
        break;
    }
  });
