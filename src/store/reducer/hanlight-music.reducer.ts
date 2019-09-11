import { isDraft, produce } from 'immer';
import {
  hanlightMusicActions,
  HanlightMusicModel,
  hanlightMusicReducerActions,
} from 'store';

const initialState: HanlightMusicModel = {
  musicList: [],
  hanlightStatus: {
    getMusicStatus: 'none',
    postMusicStatus: 'none',
    getMusicSearchStatus: 'none',
  },
  searchList: [],
  toggleHMstatus: false,
};

export const hanlightMusicReducer = (
  state: HanlightMusicModel = initialState,
  action: hanlightMusicReducerActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'GET_MUSIC':
        draft.hanlightStatus.getMusicStatus = 'pending';
        break;

      case 'GET_MUSIC_SUCCESS':
        draft.hanlightStatus.getMusicStatus = 'success';
        draft.musicList = action.payload.musics;
        break;

      case 'GET_MUSIC_FAILURE':
        draft.hanlightStatus.getMusicStatus = 'failure';
        break;

      case 'POST_MUSIC':
        draft.hanlightStatus.postMusicStatus = 'pending';
        break;

      case 'POST_MUSIC_SUCCESS':
        draft.hanlightStatus.postMusicStatus = 'success';
        break;

      case 'POST_MUSIC_FAILURE':
        draft.hanlightStatus.postMusicStatus = 'failure';
        break;

      case 'GET_MUSIC_SEARCH':
        draft.hanlightStatus.getMusicSearchStatus = 'pending';
        break;

      case 'GET_MUSIC_SEARCH_SUCCESS':
        draft.hanlightStatus.getMusicSearchStatus = 'success';
        draft.searchList.length = 0;
        console.log(action.payload);
        console.log(state.searchList);
        console.log(draft.searchList);
        draft.searchList = action.payload.musics;
        console.log(state.searchList);
        console.log(draft.searchList);
        break;

      case 'GET_MUSIC_SEARCH_FAILURE':
        draft.hanlightStatus.getMusicSearchStatus = 'failure';
        break;

      case 'TOGGLE_HM':
        draft.toggleHMstatus = action.payload;

      case 'RESET_SEARCH_LIST':
        draft.hanlightStatus.getMusicSearchStatus = 'none';
        draft.hanlightStatus.getMusicStatus = 'none';
        draft.hanlightStatus.postMusicStatus = 'none';
        draft.searchList = [];

      default:
        break;
    }
  });
