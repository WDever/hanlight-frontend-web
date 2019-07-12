import * as React from 'react';

import pwRecoveryContainer from 'container/user/recovery/pwRecovery';
import { Device } from 'lib/styles';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

const Template = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${Device.mobileL} {
    align-items: flex-start;
    margin-top: 2.78rem;
  }
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
