import MainNoticeComponent from 'components/main/notice/main-notice.component';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  GetNoticeListParams,
  Notice,
  noticeActions,
  noticeReducerActions,
} from 'store';

export interface MainNoticeProps {
  name: string;
  noticeList: Notice[];
  getNoticeListStatus: 'none' | 'pending' | 'success' | 'failure';
  accessToken: string;
}

export interface MainNoticeMethod {
  getNoticeList(params: GetNoticeListParams): void;
}

const MainNoticeContainer: React.FC<
  MainNoticeProps & MainNoticeMethod & RouteComponentProps<any>
> = ({
  name,
  getNoticeList,
  noticeList,
  getNoticeListStatus,
  accessToken,
  history,
  location,
  match,
}) => (
  <MainNoticeComponent
    name={name}
    getNoticeList={getNoticeList}
    noticeList={noticeList}
    getNoticeListStatus={getNoticeListStatus}
    accessToken={accessToken}
    history={history}
    location={location}
    match={match}
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MainNoticeContainer),
);
