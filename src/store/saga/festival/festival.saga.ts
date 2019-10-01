import { call, put, takeEvery } from 'redux-saga/effects';
import { GetLolTeam, SET_ERROR } from 'store';
import {
  FestivalTypes,
  GetFsTimetable,
  GetMatch,
  GetPayShopPurchase,
  GetSinger,
  PostAdminMoney,
  PostLolVote,
  PostSingerVote,
} from 'store/action';
import {
  getFsTimetableRequest,
  getLolTeamRequest,
  getMatchRequest,
  getPayShopPurchaseRequest,
  getSingerRequest,
  postAdminMoneyRequest,
  postLolVoteRequest,
  postSingerVoteRequest,
} from './festival.request';

function* getLolTeamSaga(action: GetLolTeam) {
  if (action.type) {
    try {
      const response = yield call(getLolTeamRequest, action.payload);

      yield put({
        type: FestivalTypes.GET_LOL_TEAM_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: FestivalTypes.GET_LOL_TEAM_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* getMatchSaga(action: GetMatch) {
  if (action.type) {
    try {
      const response = yield call(getMatchRequest, action.payload);

      yield put({
        type: FestivalTypes.GET_MATCH_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: FestivalTypes.GET_MATCH_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* getSingerSaga(action: GetSinger) {
  if (action.type) {
    try {
      const response = yield call(getSingerRequest, action.payload);

      yield put({
        type: FestivalTypes.GET_SINGER_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: FestivalTypes.GET_SINGER_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* postSingerVoteSaga(action: PostSingerVote) {
  if (action.type) {
    try {
      const response = yield call(postSingerVoteRequest, action.payload);

      yield put({
        type: FestivalTypes.POST_SINGER_VOTE_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: FestivalTypes.POST_SINGER_VOTE_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* postLolVoteSaga(action: PostLolVote) {
  if (action.type) {
    try {
      const response = yield call(postLolVoteRequest, action.payload);

      yield put({
        type: FestivalTypes.POST_LOL_VOTE_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: FestivalTypes.POST_LOL_VOTE_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* getFsTimetableSaga(action: GetFsTimetable) {
  if (action.type) {
    try {
      const response = yield call(getFsTimetableRequest, action.payload);

      yield put({
        type: FestivalTypes.GET_FS_TIMETABLE_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: FestivalTypes.GET_FS_TIMETABLE_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* getPayShopPurchaseSaga(action: GetPayShopPurchase) {
  if (action.type) {
    try {
      const response = yield call(getPayShopPurchaseRequest, action.payload);

      yield put({
        type: FestivalTypes.GET_PAY_SHOP_PURCHASE_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: FestivalTypes.GET_PAY_SHOP_PURCHASE_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* postAdminMoneySaga(action: PostAdminMoney) {
  if (action.type) {
    try {
      const response = yield call(postAdminMoneyRequest, action.payload);

      yield put({
        type: FestivalTypes.POST_ADMIN_MONEY_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: FestivalTypes.POST_ADMIN_MONEY_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

export function* festivalSaga() {
  yield takeEvery(FestivalTypes.GET_LOL_TEAM, getLolTeamSaga);
  yield takeEvery(FestivalTypes.GET_MATCH, getMatchSaga);
  yield takeEvery(FestivalTypes.GET_SINGER, getSingerSaga);
  yield takeEvery(FestivalTypes.POST_SINGER_VOTE, postSingerVoteSaga);
  yield takeEvery(FestivalTypes.POST_LOL_VOTE, postLolVoteSaga);
  yield takeEvery(FestivalTypes.GET_FS_TIMETABLE, getFsTimetableSaga);
  yield takeEvery(FestivalTypes.GET_PAY_SHOP_PURCHASE, getPayShopPurchaseSaga);
  yield takeEvery(FestivalTypes.POST_ADMIN_MONEY, postAdminMoneySaga);
}
