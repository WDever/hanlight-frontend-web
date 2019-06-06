import MainNoticeComponent from 'components/main/notice/main-notice.component';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  noticeActions,
  NoticeListItem,
  NoticeParams,
  noticeReducerActions,
} from 'store';

export interface MainNoticeProps {
  name: string;
  noticeList: NoticeListItem[];
  noticeStatus: 'none' | 'pending' | 'success' | 'failure';
  accessToken: string;
}

export interface MainNoticeMethod {
  notice(params: NoticeParams): void;
}

const MainNoticeContainer: React.FC<MainNoticeProps & MainNoticeMethod> = ({
  name,
  notice,
  noticeList,
  noticeStatus,
  accessToken,
}) => (
  <MainNoticeComponent
    name={name}
    notice={notice}
    noticeList={noticeList}
    noticeStatus={noticeStatus}
    accessToken={accessToken}
  />
);

const mapStateToProps = ({ user, notice }: AppState) => ({
  name: user.data.name,
  noticeList: notice.noticeList,
  noticeStatus: notice.noticeStatus,
  accessToken: user.accessToken,
});

const mapDispatchToProps = (dispatch: Dispatch<noticeReducerActions>) => ({
  notice: bindActionCreators(noticeActions.notice, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainNoticeContainer);
