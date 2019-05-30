import * as React from 'react';
import NoticeListComponent from 'components/main/notice/noticeList';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  AppState,
  NoticeParams,
  utilsReducerActions,
  utilsActions,
  NoticeListItem,
} from 'store';

export interface NoticeListProps {
  noticeList: NoticeListItem[];
  noticeStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface NoticeListMethod {
  notice(params: NoticeParams): void;
}

const NoticeListContainer: React.FC<NoticeListProps & NoticeListMethod> = ({
  notice,
  noticeList,
  noticeStatus,
}) => (
  <NoticeListComponent
    notice={notice}
    noticeList={noticeList}
    noticeStatus={noticeStatus}
  />
);

const mapStateToProps = ({ utils }: AppState) => ({
  noticeList: utils.noticeList,
  noticeStatus: utils.noticeStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<utilsReducerActions>) => ({
  notice: bindActionCreators(utilsActions.notice, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoticeListContainer);
