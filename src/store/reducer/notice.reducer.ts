import { produce } from 'immer';
import { NoticeModel, noticeReducerActions } from 'store';

const initialState: NoticeModel = {
  getNoticeListStatus: 'none',
  getNoticePostStatus: 'none',
  noticeList: [],
  noticePost: {
    pk: 0,
    title: '',
    content: '',
    createdAt: '',
  },
};

export const notcieReducer = (
  state: NoticeModel = initialState,
  action: noticeReducerActions,
) =>
  produce(state, draft => {
    switch (action.type) {
      case 'GET_NOTICE_LIST':
        draft.getNoticeListStatus = 'pending';
        break;

      case 'GET_NOTICE_LIST_SUCCESS':
        draft.getNoticeListStatus = 'success';
        draft.noticeList = action.payload.data.notice;
        break;

      case 'GET_NOTICE_LIST_FAILURE':
        draft.getNoticeListStatus = 'failure';
        break;

      case 'GET_NOTICE_POST':
        draft.getNoticePostStatus = 'pending';
        break;

      case 'GET_NOTICE_POST_SUCCESS':
        draft.getNoticePostStatus = 'success';
        draft.noticePost = action.payload.data;
        break;

      case 'GET_NOTICE_POST_FAILURE':
        draft.getNoticePostStatus = 'failure';
        break;

      default:
        break;
    }
  });
