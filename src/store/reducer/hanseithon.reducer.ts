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
  getHtUserStatus: 'none',
  getMentorStatus: 'none',
  getMentorRequestStatus: 'none',
  postMentorRequestStatus: 'none',
  patchMentorRequestStatus: 'none',

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

  htUserType: 'none',
  userTeam: null,
  mentorRequestList: [],
  mentorList: [],

  mentorPk: 0,

  reqPk: 0,
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

      case 'GET_HT_USER':
        draft.getHtUserStatus = 'pending';
        break;

      case 'GET_HT_USER_SUCCESS':
        draft.getHtUserStatus = 'success';
        draft.htUserType = action.payload.type;
        draft.userTeam = action.payload.team;
        break;

      case 'GET_HT_USER_FAILURE':
        draft.getHtUserStatus = 'failure';
        break;

      case 'GET_MENTOR':
        draft.getMentorStatus = 'pending';
        break;

      case 'GET_MENTOR_SUCCESS':
        draft.getMentorStatus = 'success';
        draft.mentorList = action.payload.mentor;
        break;

      case 'GET_MENTOR_FAILURE':
        draft.getMentorStatus = 'failure';
        break;

      case 'GET_MENTOR_REQUEST':
        draft.getMentorRequestStatus = 'pending';
        break;

      case 'GET_MENTOR_REQUEST_SUCCESS':
        draft.getMentorRequestStatus = 'success';
        draft.mentorRequestList = action.payload.request;
        break;

      case 'GET_MENTOR_REQUEST_FAILURE':
        draft.getMentorRequestStatus = 'failure';
        break;

      case 'POST_MENTOR_REQUEST':
        draft.postMentorRequestStatus = 'pending';
        break;

      case 'POST_MENTOR_REQUEST_SUCCESS':
        draft.postMentorRequestStatus = 'success';
        break;

      case 'POST_MENTOR_REQUEST_FAILURE':
        draft.postMentorRequestStatus = 'failure';
        break;

      case 'PATCH_MENTOR_REQUEST':
        draft.patchMentorRequestStatus = 'pending';
        break;

      case 'PATCH_MENTOR_REQUEST_SUCCESS':
        draft.patchMentorRequestStatus = 'success';
        break;

      case 'PATCH_MENTOR_REQUEST_FAILURE':
        draft.patchMentorRequestStatus = 'failure';
        break;

      case 'SET_MENTOR_PK':
        draft.mentorPk = action.payload;
        break;

        case 'SET_REQ_PK':
          draft.reqPk = action.payload;
          break;

      case 'RESET_HT_USER':
        draft.userTeam = '';
        draft.htUserType = 'none';
        break;

      case 'RESET_STATUS':
        draft.putTeamStatus = 'none';
        draft.postTeamStatus = 'none';
        draft.postTeamMatchStatus = 'none';
        draft.postObserverStatus = 'none';
        draft.getThemeStatus = 'none';
        draft.getJudgementStatus = 'none';
        draft.postMentorRequestStatus = 'none';
        draft.getMentorRequestStatus = 'none';
        draft.patchMentorRequestStatus = 'none';
        break;

      default:
        break;
    }
  });
