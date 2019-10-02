import { call, put, takeEvery } from 'redux-saga/effects';
import { GetLolTeam, SET_ERROR } from 'store';
import {
  festivalActions,
  FestivalTypes,
  GetAdminBool,
  GetAdminMoneyList,
  GetFsTimetable,
  GetMatch,
  GetMoney,
  GetPayShopPurchase,
  GetReceiptList,
  GetReceiptListPayload,
  GetShopList,
  GetSinger,
  PostAdminMoney,
  PostAdminMoneyApprove,
  PostLolVote,
  PostReceiptConfirm,
  PostReceiptConfirmPayload,
  PostShopPurchase,
  PostShopPurchasePayload,
  PostSingerVote,
} from 'store/action';
import {
  getAdminBoolRequest,
  getAdminMoneyListRequest,
  getFsTimetableRequest,
  getLolTeamRequest,
  getMatchRequest,
  getMoneyRequest,
  getPayShopPurchaseRequest,
  getReceiptListRequest,
  getShopListRequest,
  getSingerRequest,
  postAdminMoneyApproveRequest,
  postAdminMoneyRequest,
  postLolVoteRequest,
  postReceiptConfirmRequest,
  postShopPurchaseRequest,
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
function* getAdminMoneyListSaga(action: GetAdminMoneyList) {
  if (action.type) {
    try {
      const response = yield call(getAdminMoneyListRequest, action.payload);

      yield put({
        type: FestivalTypes.GET_ADMIN_MONEY_LIST_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: FestivalTypes.GET_ADMIN_MONEY_LIST_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* getMoneySaga(action: GetMoney) {
  if (action.type) {
    try {
      const response = yield call(getMoneyRequest, action.payload);

      yield put({
        type: FestivalTypes.GET_MONEY_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: FestivalTypes.GET_MONEY_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* getAdminBoolSaga(action: GetAdminBool) {
  if (action.type) {
    try {
      const response = yield call(getAdminBoolRequest, action.payload);

      yield put({
        type: FestivalTypes.GET_ADMIN_BOOL_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: FestivalTypes.GET_ADMIN_BOOL_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* postAdminMoneyApproveSaga(action: PostAdminMoneyApprove) {
  if (action.type) {
    try {
      const response = yield call(postAdminMoneyApproveRequest, action.payload);

      yield put({
        type: FestivalTypes.POST_ADMIN_MONEY_APPROVE_SUCCESS,
        payload: action.payload.charge_pk,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: FestivalTypes.POST_ADMIN_MONEY_APPROVE_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* getShopListSaga(action: GetShopList) {
  if (action.type) {
    try {
      const response = yield call(getShopListRequest, action.payload);

      yield put({
        type: FestivalTypes.GET_SHOP_LIST_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: FestivalTypes.GET_SHOP_LIST_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* postShopPurchaseSaga(action: PostShopPurchase) {
  if (action.type) {
    try {
      const response = yield call(postShopPurchaseRequest, action.payload);

      yield put({
        type: FestivalTypes.POST_SHOP_PURCHASE_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: FestivalTypes.POST_SHOP_PURCHASE_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* getReceiptListSaga(action: GetReceiptList) {
  if (action.type) {
    try {
      const response = yield call(getReceiptListRequest, action.payload);

      yield put({
        type: FestivalTypes.GET_RECEIPT_LIST_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: FestivalTypes.GET_RECEIPT_LIST_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* postReceiptConfirmSaga(action: PostReceiptConfirm) {
  if (action.type) {
    try {
      const response = yield call(postReceiptConfirmRequest, action.payload);

      yield put({
        type: FestivalTypes.POST_RECEIPT_CONFIRM_SUCCESS,
        payload: action.payload,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: FestivalTypes.POST_RECEIPT_CONFIRM_FAILURE,
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
  yield takeEvery(FestivalTypes.GET_ADMIN_MONEY_LIST, getAdminMoneyListSaga);
  yield takeEvery(FestivalTypes.GET_MONEY, getMoneySaga);
  yield takeEvery(FestivalTypes.GET_ADMIN_BOOL, getAdminBoolSaga);
  yield takeEvery(
    FestivalTypes.POST_ADMIN_MONEY_APPROVE,
    postAdminMoneyApproveSaga,
  );
  yield takeEvery(FestivalTypes.GET_SHOP_LIST, getShopListSaga);
  yield takeEvery(FestivalTypes.POST_SHOP_PURCHASE, postShopPurchaseSaga);
  yield takeEvery(FestivalTypes.GET_RECEIPT_LIST, getReceiptListSaga);
  yield takeEvery(FestivalTypes.POST_RECEIPT_CONFIRM, postReceiptConfirmSaga);
}
