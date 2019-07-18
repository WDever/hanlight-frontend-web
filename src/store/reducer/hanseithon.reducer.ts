import { produce } from 'immer';
import { HanseithonModel, hanseithonReducerActions } from 'store';

const initialState: HanseithonModel = {
  deemStatus: false,
  modalType: 'none',
  agreeStatus: false,
  putTeamStatus: 'none',
  postTeamStatus: 'none',
  getTeamStatus: 'none',
  teams: [],
};

export const hanseithonReducer = (
  state: HanseithonModel = initialState,
  action: hanseithonReducerActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'DEEM':
        draft.deemStatus = action.payload;
        break;

      case 'MODAL':
        draft.modalType = action.payload;
        break;

      case 'AGREE':
        draft.agreeStatus = action.payload;
        break;

      case 'PUT_TEAM':
        draft.putTeamStatus = 'pending';
        break;

      case 'PUT_TEAM_SUCCESS':
        draft.putTeamStatus = 'success';
        break;

      case 'PUT_TEAM_FAILURE':
        draft.putTeamStatus = 'failure';

      case 'POST_TEAM':
        draft.postTeamStatus = 'pending';
        break;

      case 'POST_TEAM_SUCCESS':
        draft.postTeamStatus = 'success';
        break;

      case 'POST_TEAM_FAILURE':
        draft.postTeamStatus = 'failure';
        break;

      case 'GET_TEAM':
        draft.getTeamStatus = 'pending';
        break;

      case 'GET_TEAM_SUCCESS':
        draft.getTeamStatus = 'success';
        
        draft.teams = action.payload.team;
        break;

      case 'GET_TEAM_FAILURE':
        draft.getTeamStatus = 'failure';
        break;

      default:
        break;
    }
  });
