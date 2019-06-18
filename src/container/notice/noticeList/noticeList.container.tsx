import * as React from 'react';

import NoticeListComponent from 'components/notice/noticeList';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  GetNoticeListParams,
  Notice,
  noticeActions,
  noticeReducerActions,
} from 'store';

export interface NoticeListProps {
  accessToken: string;
  noticeList: Notice[];
  noticeCount: number;
  getNoticeListStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface NoticeListMethod {
  getNoticeList: ({ accessToken, page, title }: GetNoticeListParams) => void;
}

const NoticeListContainer: React.FC<
  NoticeListProps & NoticeListMethod & RouteComponentProps
> = ({
  accessToken,
  noticeList,
  noticeCount,
  getNoticeList,
  getNoticeListStatus,
  history,
  location,
  match,
}) => (
  <NoticeListComponent
    accessToken={accessToken}
    noticeList={noticeList}
    noticeCount={noticeCount}
    getNoticeList={getNoticeList}
    history={history}
    location={location}
    match={match}
    getNoticeListStatus={getNoticeListStatus}
  />
);

const mapStateToProps = ({ user, notice }: AppState) => ({
  accessToken: user.accessToken,
  noticeList: notice.noticeList,
  noticeCount: notice.noticeCount,
  getNoticeListStatus: notice.getNoticeListStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<noticeReducerActions>) => ({
  getNoticeList: bindActionCreators(noticeActions.getNoticeList, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoticeListContainer);
