import * as React from 'react';

import NoticeComponent from 'components/notice/detail-notice';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

const DetailNoticePage: React.FC = () => {
  return (
    <Switch>
      <Route exact={true} path="/notice" component={NoticeComponent} />
    </Switch>
  );
};

export default DetailNoticePage;
