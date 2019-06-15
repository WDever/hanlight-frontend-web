import MainNoticeComponent from 'components/notice/main-notice';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  GetNoticeListParams,
  noticeActions,
  NoticeListItem,
  noticeReducerActions,
} from 'store';

export interface MainNoticeProps {
  name: string;
  noticeList: NoticeListItem[];
  getNoticeListStatus: 'none' | 'pending' | 'success' | 'failure';
  accessToken: string;
}

export interface MainNoticeMethod {
  getNoticeList(params: GetNoticeListParams): void;
}

const MainNoticeContainer: React.FC<MainNoticeProps & MainNoticeMethod> = ({
  name,
  getNoticeList,
  noticeList,
  getNoticeListStatus,
  accessToken,
}) => (
  <MainNoticeComponent
    name={name}
    getNoticeList={getNoticeList}
    noticeList={noticeList}
    getNoticeListStatus={getNoticeListStatus}
    accessToken={accessToken}
  />
);

const mapStateToProps = ({ user, notice }: AppState) => ({
  name: user.data.name,
  noticeList: notice.noticeList,
  getNoticeListStatus: notice.getNoticeListStatus,
  accessToken: user.accessToken,
});

const mapDispatchToProps = (dispatch: Dispatch<noticeReducerActions>) => ({
  getNoticeList: bindActionCreators(noticeActions.getNoticeList, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainNoticeContainer);
