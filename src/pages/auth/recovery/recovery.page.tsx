import * as React from 'react';

import pwRecoveryContainer from 'container/user/recovery/pwRecovery';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

const Template = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const RecoveryPage: React.FC = () => (
  <Template>
    <Switch>
      <Route
        exact={true}
        path="/user/recovery/password"
        component={pwRecoveryContainer}
      />
    </Switch>
  </Template>
);

export default RecoveryPage;
