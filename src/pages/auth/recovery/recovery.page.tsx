import * as React from 'react';

import pwRecoveryContainer from 'container/user/recovery/pwRecovery';
import { Device } from 'lib/styles';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  min-height: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${Device.mobileL} {
    padding: 0;
    align-items: flex-start;
    margin-top: 2.78rem;
  }
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
