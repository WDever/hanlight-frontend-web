import * as React from 'react';

import NoticePostComponent from 'components/notice/noticePost';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
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
  getNoticePost: ({ accessToken, postPk }: GetNoticePostParams) => void;
}

const NoticePostContainer: React.FC<
  NoticePostProps & NoticePostMethod & RouteComponentProps<{ postPk: string }>
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

const mapStateToProps = ({ user, notice }: AppState) => ({
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
