import * as React from 'react';

import NoticeDetailContainer from 'container/notice/noticeDetail';
import NoticeListContainer from 'container/notice/noticeList';
import { Route, Switch } from 'react-router-dom';

const NoticePage: React.FC = () => {
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

export default NoticePage;
