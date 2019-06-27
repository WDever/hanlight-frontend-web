import * as React from 'react';

import NoticePostComponent from 'components/notice/detail-notice/detail-noticePost';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  ErrorResponse,
  GetNoticePostParams,
  Notice,
  noticeActions,
  noticeReducerActions,
} from 'store';

export interface NoticePostProps {
  accessToken: string;
  noticeList: Notice[];
  getNoticePostStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface NoticePostMethod {
  getNoticePost: ({ accessToken, post_pk }: GetNoticePostParams) => void;
}

const NoticePostContainer: React.FC<
  NoticePostProps & NoticePostMethod & RouteComponentProps<{ post_pk: string }>
> = ({
  history,
  location,
  match,
  accessToken,
  noticeList,
  getNoticePost,
  getNoticePostStatus,
}) => (
  <NoticePostComponent
    history={history}
    location={location}
    match={match}
    accessToken={accessToken}
    noticeList={noticeList}
    getNoticePost={getNoticePost}
    getNoticePostStatus={getNoticePostStatus}
  />
);

const mapStateToProps = ({ user, notice, error }: AppState) => ({
  accessToken: user.accessToken,
  noticeList: notice.noticeList,
  getNoticePostStatus: notice.getNoticePostStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<noticeReducerActions>) => ({
  getNoticePost: bindActionCreators(noticeActions.getNoticePost, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoticePostContainer);
