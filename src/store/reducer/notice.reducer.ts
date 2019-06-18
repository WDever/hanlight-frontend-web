import { produce } from 'immer';
import { NoticeModel, noticeReducerActions } from 'store';

const initialState: NoticeModel = {
  noticeList: [],
  noticeCount: 0,
  getNoticeListStatus: 'none',
  getNoticePostStatus: 'none',
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
        draft.noticeCount = action.payload.data.resultCount;
        break;

      case 'GET_NOTICE_LIST_FAILURE':
        draft.getNoticeListStatus = 'failure';
        break;

      case 'GET_NOTICE_POST':
        draft.getNoticePostStatus = 'pending';
        break;

      case 'GET_NOTICE_POST_SUCCESS':
        draft.getNoticePostStatus = 'success';
        const duplicateIndex = draft.noticeList.findIndex(
          val => val.pk === action.payload.data.pk,
        );
        if (duplicateIndex < 0) {
          draft.noticeList.push(action.payload.data);
        } else {
          draft.noticeList[duplicateIndex] = action.payload.data;
        }
        break;

      case 'GET_NOTICE_POST_FAILURE':
        draft.getNoticePostStatus = 'failure';
        break;

      default:
        break;
    }
  });
