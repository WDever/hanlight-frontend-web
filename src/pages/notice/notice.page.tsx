import * as React from 'react';

import NoticeComponent from 'components/notice';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

const NoticePage: React.FC = () => {
  return (
    <Switch>
      <Route exact={true} path="/notice" component={NoticeComponent} />
      {/* <Route exact={true} path="/notice/:pk" /> */}
    </Switch>
  );
};

export default NoticePage;
