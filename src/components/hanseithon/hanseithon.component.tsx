import * as React from 'react';

import { HanseiThonProps } from 'container/hanseithon';
import JoinPage from 'pages/hanseithon/join';
import MainPage from 'pages/hanseithon/main';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import styled from 'styled-components';

export const Deem = styled.div`
  width: 100%;
  height: 92.6%;
  opacity: 0.8;
  background-color: #171717;
  position: absolute;
  z-index: 2;
`;

const HanseiThonComponent: React.FC<HanseiThonProps> = ({ deemStatus }) => {
  return (
    <>
      {deemStatus && <Deem />}
      <Switch>
        <Route exact={true} path="/hanseithon/join" component={JoinPage} />
        <Route exact={true} path="/hanseithon" component={MainPage} />
      </Switch>
    </>
  );
};

export default HanseiThonComponent;
