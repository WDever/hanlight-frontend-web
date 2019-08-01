import { hanseithonInstance } from 'lib/baseUrl';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GET_TEAM_FAILURE,
  GET_TEAM_SUCCESS,
  GetTeam,
  PUT_TEAM_FAILURE,
  PUT_TEAM_SUCCESS,
  PutTeam,
  PutTeamParams,
  SET_ERROR,
} from 'store';
import {
  GET_JUDGEMENT,
  GET_JUDGEMENT_FAILURE,
  GET_JUDGEMENT_SUCCESS,
  GET_TEAM,
  GET_TEAM_MATCH,
  GET_TEAM_MATCH_FAILURE,
  GET_TEAM_MATCH_SUCCESS,
  GET_THEME,
  GET_THEME_FAILURE,
  GET_THEME_SUCCESS,
  GetMentorRequest,
  GetTeamMatchParams,
  GetTeamParams,
  GetTheme,
  POST_OBSERVER,
  POST_OBSERVER_FAILURE,
  POST_OBSERVER_SUCCESS,
  POST_TEAM,
  POST_TEAM_FAILURE,
  POST_TEAM_MATCH,
  POST_TEAM_MATCH_FAILURE,
  POST_TEAM_MATCH_SUCCESS,
  POST_TEAM_SUCCESS,
  PostObserver,
  PostTeam,
  PostTeamMatch,
  PostTeamMatchParams,
  PostTeamParams,
  PUT_TEAM,
} from 'store/action';
import {
  GET_HT_USER,
  GET_HT_USER_FAILURE,
  GET_HT_USER_SUCCESS,
  GET_MENTOR,
  GET_MENTOR_FAILURE,
  GET_MENTOR_REQUEST,
  GET_MENTOR_REQUEST_FAILURE,
  GET_MENTOR_REQUEST_SUCCESS,
  GET_MENTOR_SUCCESS,
  GetHtUser,
  GetMentor,
  PATCH_MENTOR_REQUEST,
  PATCH_MENTOR_REQUEST_FAILURE,
  PATCH_MENTOR_REQUEST_SUCCESS,
  PatchMentorRequest,
  PatchMentorRequestParams,
  POST_FILE,
  POST_FILE_FAILURE,
  POST_FILE_SUCCESS,
  POST_MENTOR_COMMENT,
  POST_MENTOR_COMMENT_FAILURE,
  POST_MENTOR_COMMENT_SUCCESS,
  POST_MENTOR_REQUEST,
  POST_MENTOR_REQUEST_FAILURE,
  POST_MENTOR_REQUEST_SUCCESS,
  PostFile,
  PostFileParams,
  PostMentorComment,
  PostMentorCommentParams,
  PostMentorRequest,
  PostMentorRequestParams,
} from 'store/action/hanseithon.action';

const putTeamApi = (payload: PutTeamParams) =>
  hanseithonInstance
    .put(
      '/team',
      {
        team_pk: payload.team_pk,
        position: payload.posiotion,
        code: payload.code,
      },
      {
        headers: {
          authorization: payload.accessToken,
        },
      },
    )
    .then(res => res);

function* putTeamApiSaga(action: PutTeam) {
  if (action.type) {
    try {
      const response = yield call(putTeamApi, action.payload);

      yield put({
        type: PUT_TEAM_SUCCESS,
        payload: { ...response.data, pk: action.payload.team_pk },
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: PUT_TEAM_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const getTeamMatchApi = (payload: GetTeamMatchParams) =>
  hanseithonInstance
    .get('/team/match', {
      headers: {
        authorization: payload.accessToken,
      },
      params: {
        category: payload.category,
      },
    })
    .then(res => res.data);
function* getTeamMatchApiSaga(action: PostTeamMatch) {
  if (action.type) {
    try {
      const response = yield call(getTeamMatchApi, action.payload);

      yield put({ type: GET_TEAM_MATCH_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: GET_TEAM_MATCH_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const postMatchTeamApi = (payload: PostTeamMatchParams) =>
  hanseithonInstance
    .post(
      '/team/match',
      {
        category: payload.category,
        position: payload.position,
        introduction: payload.introduction,
      },
      {
        headers: {
          authorization: payload.accessToken,
        },
      },
    )
    .then(res => res.data);

function* postMatchTeamApiSaga(action: PostTeamMatch) {
  if (action.type) {
    try {
      const response = yield call(postMatchTeamApi, action.payload);

      yield put({ type: POST_TEAM_MATCH_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: POST_TEAM_MATCH_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const postTeamApi = (payload: PostTeamParams) =>
  hanseithonInstance
    .post(
      '/team',
      {
        team_name: payload.teamName,
        user_position: payload.userPosiotion,
        category: payload.category,
      },
      {
        headers: {
          authorization: payload.accessToken,
        },
      },
    )
    .then(res => res.data);

function* postTeamApiSaga(action: PostTeam) {
  if (action.type) {
    try {
      const response = yield call(postTeamApi, action.payload);

      yield put({ type: POST_TEAM_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: POST_TEAM_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const getTeamApi = (payload: GetTeamParams) =>
  hanseithonInstance
    .get('/team', {
      headers: {
        authorization: payload.accessToken,
      },
      params: {
        category: payload.category,
      },
    })
    .then(res => res.data);

function* getTeamApiSaga(action: GetTeam) {
  if (action.type) {
    try {
      const response = yield call(getTeamApi, action.payload);

      yield put({ type: GET_TEAM_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: GET_TEAM_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const postObserverApi = (payload: string) =>
  hanseithonInstance
    .post(
      '/observer',
      {},
      {
        headers: {
          authorization: payload,
        },
      },
    )
    .then(res => res.data);

function* postObserverApiSaga(action: PostObserver) {
  if (action.type) {
    try {
      const response = yield call(postObserverApi, action.payload);

      yield put({ type: POST_OBSERVER_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: POST_OBSERVER_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const getThemeApi = (payload: string) =>
  hanseithonInstance
    .get('/theme', {
      headers: {
        authorization: payload,
      },
    })
    .then(res => res.data);

function* getThemeApiSaga(action: GetTheme) {
  if (action.type) {
    try {
      const response = yield call(getThemeApi, action.payload);

      yield put({ type: GET_THEME_SUCCESS, payload: response.data.theme.url });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: GET_THEME_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const getJudgementApi = (payload: string) =>
  hanseithonInstance
    .get('/judgement', {
      headers: {
        authorization: payload,
      },
    })
    .then(res => res.data);

function* getJudgementApiSaga(action: GetTheme) {
  if (action.type) {
    try {
      const response = yield call(getJudgementApi, action.payload);
      yield put({
        type: GET_JUDGEMENT_SUCCESS,
        payload: response.data.judgement.url,
      });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: GET_JUDGEMENT_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const getUserApi = (payload: string) =>
  hanseithonInstance
    .get('/user', {
      headers: {
        authorization: payload,
      },
    })
    .then(res => res.data);

function* getUserApiSaga(action: GetHtUser) {
  if (action.type) {
    try {
      const response = yield call(getUserApi, action.payload);

      yield put({ type: GET_HT_USER_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: GET_HT_USER_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const getMentorApi = (payload: string) =>
  hanseithonInstance
    .get('/mentor', {
      headers: {
        authorization: payload,
      },
    })
    .then(res => res.data);

function* getMentorApiSaga(action: GetMentor) {
  if (action.type) {
    try {
      const response = yield call(getMentorApi, action.payload);
      yield put({ type: GET_MENTOR_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: GET_MENTOR_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const getMentorRequestApi = (payload: string) =>
  hanseithonInstance
    .get('mentor/request', {
      headers: {
        authorization: payload,
      },
    })
    .then(res => res.data);

function* getMentorRequestApiSaga(action: GetMentorRequest) {
  if (action.type) {
    try {
      const response = yield call(getMentorRequestApi, action.payload);

      yield put({ type: GET_MENTOR_REQUEST_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: GET_MENTOR_REQUEST_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const postMentorRequestApi = (payload: PostMentorRequestParams) =>
  hanseithonInstance
    .post(
      '/mentor/request',
      {
        content: payload.content,
        mentor_pk: payload.mentor_pk,
      },
      {
        headers: {
          authorization: payload.accessToken,
        },
      },
    )
    .then(res => res.data);

function* postMentorRequestApiSaga(action: PostMentorRequest) {
  if (action.type) {
    try {
      const response = yield call(postMentorRequestApi, action.payload);
      yield put({ type: POST_MENTOR_REQUEST_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: POST_MENTOR_REQUEST_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const patchMentorRequestApi = (payload: PatchMentorRequestParams) =>
  hanseithonInstance.patch(
    '/mentor/request',
    {
      request_pk: payload.requestPk,
    },
    {
      headers: {
        authorization: payload.accessToken,
      },
    },
  );

function* patchMentorRequestApiSaga(action: PatchMentorRequest) {
  if (action.type) {
    try {
      const response = yield call(patchMentorRequestApi, action.payload);

      yield put({ type: PATCH_MENTOR_REQUEST_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: PATCH_MENTOR_REQUEST_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const postMentorCommentApi = (payload: PostMentorCommentParams) =>
  hanseithonInstance
    .post(
      '/team/comment',
      {
        team_pk: payload.team_pk,
        content: payload.content,
      },
      {
        headers: {
          authorization: payload.accessToken,
        },
      },
    )
    .then(res => res.data);

function* postMentorCommentApiSaga(action: PostMentorComment) {
  if (action.type) {
    try {
      const response = yield call(postMentorCommentApi, action.payload);

      yield put({ type: POST_MENTOR_COMMENT_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: POST_MENTOR_COMMENT_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

const postFileApi = (payload: PostFileParams) => {
  const formData = new FormData();
  formData.append('file', payload.file);
  if (payload.link1 && payload.link2) {
    formData.append('link1', payload.link1);
    formData.append('link2', payload.link2);
  } else if (payload.link1) {
    formData.append('link1', payload.link1);
  } else if (payload.link2) {
    formData.append('link2', payload.link2);
  }

  return hanseithonInstance
    .post('/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: payload.accessToken,
      },
    })
    .then(res => res.data);
};

function* postFileApiSaga(action: PostFile) {
  if (action.type) {
    try {
      const response = yield call(postFileApi, action.payload);

      yield put({ type: POST_FILE_SUCCESS, payload: response.data });
    } catch (e) {
      yield put({
        type: SET_ERROR,
        name: POST_FILE_FAILURE,
        payload: { err: e, origin: action.payload },
      });
    }
  }
}

function* hanseithonSaga() {
  yield takeEvery(PUT_TEAM, putTeamApiSaga);
  yield takeEvery(GET_TEAM, getTeamApiSaga);
  yield takeEvery(GET_TEAM_MATCH, getTeamMatchApiSaga);
  yield takeEvery(POST_TEAM_MATCH, postMatchTeamApiSaga);
  yield takeEvery(POST_TEAM, postTeamApiSaga);
  yield takeEvery(POST_OBSERVER, postObserverApiSaga);
  yield takeEvery(GET_THEME, getThemeApiSaga);
  yield takeEvery(GET_JUDGEMENT, getJudgementApiSaga);
  yield takeEvery(GET_HT_USER, getUserApiSaga);
  yield takeEvery(GET_MENTOR, getMentorApiSaga);
  yield takeEvery(GET_MENTOR_REQUEST, getMentorRequestApiSaga);
  yield takeEvery(POST_MENTOR_REQUEST, postMentorRequestApiSaga);
  yield takeEvery(PATCH_MENTOR_REQUEST, patchMentorRequestApiSaga);
  yield takeEvery(POST_MENTOR_COMMENT, postMentorCommentApiSaga);
  yield takeEvery(POST_FILE, postFileApiSaga);
}

export { hanseithonSaga };
