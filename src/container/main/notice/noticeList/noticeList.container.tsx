import * as React from 'react';
import NoticeListComponent from 'components/main/notice/noticeList';
import { bindActionCreators, Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
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

const NoticeListContainer: React.FC<
NoticeListProps & NoticeListMethod & RouteComponentProps
> = ({
  notice, noticeList, location, match, history, noticeStatus
}) => (
  <NoticeListComponent
    notice={notice}
    noticeList={noticeList}
    location={location}
    match={match}
    history={history}
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NoticeListContainer),
);
