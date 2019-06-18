import * as React from 'react';

import NoticeListContainer from 'container/notice/detail-notice/detail-noticeList';
import NoticePostContainer from 'container/notice/detail-notice/detail-noticePost';
import { Route, Switch } from 'react-router-dom';

const DetailNoticePage: React.FC = () => {
  return (
    <Switch>
      <Route exact={true} path="/notice" component={NoticeListContainer} />
      <Route
        exact={true}
        path="/notice/:postPk"
        component={NoticePostContainer}
      />
    </Switch>
  );
};

export default DetailNoticePage;
