import { produce } from 'immer';
import { festivalActions, FestivalModel, festivalReducerActions } from 'store';
import { FSLolTeamModel, FSSingerModel } from 'store/model';

const initialState: FestivalModel = {
  shopList: {},
  teams: [],
  coupleNumber: 0,
  singers: [],
  fsTimetable: [],
  festivalStatus: {
    getShopListStatus: 'none',
    getLolTeamStatus: 'none',
    getMatchStatus: 'none',
    getSingerStatus: 'none',
    getFsTimetableStatus: 'none',

    postSingerVoteStatus: 'none',
    postLolVoteStatus: 'none',
  },
  modalData: {
    status: false,
    data: {
      type: '',
      content: '',
    },
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

      default:
        break;
    }
  });
