import * as React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import pwRecoveryContainer from 'container/auth/recovery/pwRecovery';

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
        exact
        path='/user/recovery/password'
        component={pwRecoveryContainer}
      />
    </Switch>
  </Template>
);

export default RecoveryPage;
