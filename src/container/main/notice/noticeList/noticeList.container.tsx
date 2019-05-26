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
}

export interface NoticeListMethod {
  notice(params: NoticeParams): void;
}

const NoticeListContainer: React.FC<
NoticeListProps & NoticeListMethod & RouteComponentProps
> = ({
  notice, noticeList, location, match, history,
}) => (
  <NoticeListComponent
    notice={notice}
    noticeList={noticeList}
    location={location}
    match={match}
    history={history}
  />
);

const mapStateToProps = ({ utils }: AppState) => ({
  noticeList: utils.noticeList,
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
