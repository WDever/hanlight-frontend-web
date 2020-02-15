import * as React from 'react';

import NoticeListContainer from 'container/notice/detail-notice/detail-noticeList';
import NoticePostContainer from 'container/notice/detail-notice/detail-noticePost';
import { Route, Switch } from 'react-router-dom';

const DetailNoticePage: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/notice' component={NoticeListContainer} />
      <Route exact path='/notice/:post_pk' component={NoticePostContainer} />
    </Switch>
  );
};

export default DetailNoticePage;
