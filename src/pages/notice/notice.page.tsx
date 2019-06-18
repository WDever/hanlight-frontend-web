import * as React from 'react';

import NoticeListContainer from 'container/notice/noticeList';
import NoticePostContainer from 'container/notice/noticePost';
import { Route, Switch } from 'react-router-dom';

const NoticePage: React.FC = () => {
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

export default NoticePage;
