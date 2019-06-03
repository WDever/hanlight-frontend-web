import { produce } from 'immer';
import { NoticeModel, noticeReducerActions } from 'store';

const initialState: NoticeModel = {
  noticeStatus: 'none',
  noticePostStatus: 'none',
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
) => produce(state, (draft) => {
  switch (action.type) {
    case 'NOTICE':
      draft.noticeStatus = 'pending';
      break;

    case 'NOTICE_SUCCESS':
      draft.noticeStatus = 'success';
      draft.noticeList = action.payload.data.notice;
      break;

    case 'NOTICE_FAILURE':
      draft.noticeStatus = 'failure';
      break;

    case 'NOTICE_POST':
      draft.noticePostStatus = 'pending';
      break;

    case 'NOTICE_POST_SUCCESS':
      draft.noticePostStatus = 'success';
      draft.noticePost = action.payload.data;
      break;

    case 'NOTICE_POST_FAILURE':
      draft.noticePostStatus = 'failure';
      break;

    default:
      break;
  }
});
