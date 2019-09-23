import { isDraft, produce } from 'immer';
import {
  hanlightMusicActions,
  HanlightMusicModel,
  hanlightMusicReducerActions,
} from 'store';

const initialState: HanlightMusicModel = {
  musicList: [],
  hanlightMusicStatus: {
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
        draft.hanlightMusicStatus.getMusicStatus = 'pending';
        break;

      case 'GET_MUSIC_SUCCESS':
        draft.hanlightMusicStatus.getMusicStatus = 'success';
        draft.musicList = action.payload.musics;
        break;

      case 'GET_MUSIC_FAILURE':
        draft.hanlightMusicStatus.getMusicStatus = 'failure';
        break;

      case 'POST_MUSIC':
        draft.hanlightMusicStatus.postMusicStatus = 'pending';
        break;

      case 'POST_MUSIC_SUCCESS':
        draft.hanlightMusicStatus.postMusicStatus = 'success';
        break;

      case 'POST_MUSIC_FAILURE':
        draft.hanlightMusicStatus.postMusicStatus = 'failure';
        break;

      case 'GET_MUSIC_SEARCH':
        draft.hanlightMusicStatus.getMusicSearchStatus = 'pending';
        break;

      case 'GET_MUSIC_SEARCH_SUCCESS':
        draft.hanlightMusicStatus.getMusicSearchStatus = 'success';
        draft.searchList.length = 0;
        draft.searchList = action.payload.musics;
        break;

      case 'GET_MUSIC_SEARCH_FAILURE':
        draft.hanlightMusicStatus.getMusicSearchStatus = 'failure';
        break;

      case 'TOGGLE_HM':
        draft.toggleHMstatus = action.payload;

      case 'RESET_SEARCH_LIST':
        draft.hanlightMusicStatus.getMusicSearchStatus = 'none';
        draft.hanlightMusicStatus.getMusicStatus = 'none';
        draft.hanlightMusicStatus.postMusicStatus = 'none';
        draft.searchList = [];

      default:
        break;
    }
  });
