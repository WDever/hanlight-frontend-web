import * as React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import PrivacyPolicyPage from './privacyPolicy';
import TermsOfUsePage from './termsOfUse';

const servicePage = () => {
  return (
    <Switch>
      <Route
        exact={true}
        path="/service/privacypolicy"
        component={PrivacyPolicyPage}
      />
      <Route
        exact={true}
        path="/service/termsofuse"
        component={TermsOfUsePage}
      />
      <Redirect to="/error" />
    </Switch>
  );
};

export default servicePage;
