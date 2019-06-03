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
  token: string;
}

export interface NoticeListMethod {
  notice(params: NoticeParams): void;
}

const NoticeListContainer: React.FC<NoticeListProps & NoticeListMethod> = ({
  name,
  notice,
  noticeList,
  noticeStatus,
  token,
}) => (
  <NoticeListComponent
    name={name}
    notice={notice}
    noticeList={noticeList}
    noticeStatus={noticeStatus}
    token={token}
  />
);

const mapStateToProps = ({ user, notice }: AppState) => ({
  name: user.data.name,
  noticeList: notice.noticeList,
  noticeStatus: notice.noticeStatus,
  token: user.token,
});

const mapDispatchToProps = (dispatch: Dispatch<noticeReducerActions>) => ({
  notice: bindActionCreators(noticeActions.notice, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoticeListContainer);
