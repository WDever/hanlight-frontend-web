import * as React from 'react';

import NoticeDetailContainer from 'container/notice/detail-notice/detail-noticePost';
import NoticeListContainer from 'container/notice/detail-notice/detail-noticeList';
import { Route, Switch } from 'react-router-dom';

const DetailNoticePage: React.FC = () => {
  return (
    <Switch>
      <Route exact={true} path="/notice" component={NoticeListContainer} />
      <Route
        exact={true}
        path="/notice/:pk"
        component={NoticeDetailContainer}
      />
    </Switch>
  );
};

export default DetailNoticePage;
