import { produce } from 'immer';
import { HanseithonModel, hanseithonReducerActions } from 'store';

const initialState: HanseithonModel = {
  deemStatus: false,
  modalType: 'none',
  agreeStatus: false,
  putTeamStatus: 'none',
  postTeamStatus: 'none',
  getTeamStatus: 'none',
  getTeamMatchStatus: 'none',
  postTeamMatchStatus: 'none',
  postObserverStatus: 'none',
  getThemeStatus: 'none',
  getJudgementStatus: 'none',

  themeUrl: '',
  judgementUrl: '',

  teams: [],
  teamPk: 0,
  team: {
    pk: 0,
    name: '',
    leader_name: '',
    category: 'none',
    createAt: '',
    code: 0,

    teamMember: [],
  },
  match: [],
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

      case 'SET_TEAM_PK':
        draft.teamPk = action.payload;
        break;

      case 'PUT_TEAM':
        draft.putTeamStatus = 'pending';
        break;

      case 'PUT_TEAM_SUCCESS': {
        draft.putTeamStatus = 'success';

        const seletedTeam = draft.teams.find(
          item => item.pk === action.payload.pk,
        );

        console.log(seletedTeam);

        draft.team = seletedTeam === undefined ? draft.team : seletedTeam;
        break;
      }

      case 'PUT_TEAM_FAILURE':
        draft.putTeamStatus = 'failure';
        break;

      case 'POST_TEAM':
        draft.postTeamStatus = 'pending';
        break;

      case 'POST_TEAM_SUCCESS':
        draft.postTeamStatus = 'success';
        draft.teams.push({
          ...action.payload.team,
        });
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

      case 'GET_TEAM_MATCH':
        draft.getTeamMatchStatus = 'pending';
        break;
      case 'GET_TEAM_MATCH_SUCCESS':
        draft.getTeamMatchStatus = 'success';
        draft.match = action.payload.match;
        break;
      case 'GET_TEAM_MATCH_FAILURE':
        draft.getTeamMatchStatus = 'failure';
        break;

      case 'POST_TEAM_MATCH':
        draft.postTeamMatchStatus = 'pending';
        break;

      case 'POST_TEAM_MATCH_SUCCESS':
        draft.postTeamMatchStatus = 'success';
        break;

      case 'POST_TEAM_MATCH_FAILURE':
        draft.postTeamMatchStatus = 'failure';
        break;

      case 'POST_OBSERVER':
        draft.postObserverStatus = 'pending';
        break;

      case 'POST_OBSERVER_SUCCESS':
        draft.postObserverStatus = 'success';
        break;

      case 'POST_OBSERVER_FAILURE':
        draft.postObserverStatus = 'failure';
        break;

      case 'GET_THEME':
        draft.getThemeStatus = 'pending';
        break;

      case 'GET_THEME_SUCCESS':
        draft.getThemeStatus = 'success';
        draft.themeUrl = action.payload;
        break;

      case 'GET_THEME_FAILURE':
        draft.getThemeStatus = 'failure';
        break;

      case 'GET_JUDGEMENT':
        draft.getJudgementStatus = 'pending';
        break;

      case 'GET_JUDGEMENT_SUCCESS':
        draft.getJudgementStatus = 'success';
        draft.judgementUrl = action.payload;
        break;

      case 'GET_JUDGEMENT_FAILURE':
        draft.getJudgementStatus = 'failure';
        break;

      case 'RESET_STATUS':
        draft.putTeamStatus = 'none';
        draft.postTeamStatus = 'none';
        draft.postTeamMatchStatus = 'none';
        draft.postObserverStatus = 'none';
        draft.getThemeStatus = 'none';
        draft.getJudgementStatus = 'none';
        break;

      default:
        break;
    }
  });
