import * as React from 'react';

import NoticeDetailComponent from 'components/notice/detail-notice/detail-noticePost';
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

const NoticeListContainer: React.FC<
  NoticePostProps & NoticePostMethod & RouteComponentProps
> = ({
  history,
  location,
  match,
  accessToken,
  noticeList,
  getNoticePostStatus,
}) => <NoticeDetailComponent />;

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
)(NoticeListContainer);
