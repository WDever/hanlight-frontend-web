import NoticeListComponent from 'components/main/notice/noticeList';
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

export interface NoticeListProps {
  name: string;
  noticeList: NoticeListItem[];
  noticeStatus: 'none' | 'pending' | 'success' | 'failure';
  accessToken: string;
}

export interface NoticeListMethod {
  notice(params: NoticeParams): void;
}

const NoticeListContainer: React.FC<NoticeListProps & NoticeListMethod> = ({
  name,
  notice,
  noticeList,
  noticeStatus,
  accessToken,
}) => (
  <NoticeListComponent
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
)(NoticeListContainer);
