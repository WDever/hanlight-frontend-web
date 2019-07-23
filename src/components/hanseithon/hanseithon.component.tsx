import * as React from 'react';

import { HanseiThonProps } from 'container/hanseithon';
import HTCurrentPage from 'pages/hanseithon/current';
import JoinPage from 'pages/hanseithon/join';
import MainPage from 'pages/hanseithon/join-main';
import HTMainPage from 'pages/hanseithon/main';
import HTParticipationPage from 'pages/hanseithon/participation';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import styled from 'styled-components';

export const Deem = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0.8;
  background-color: #171717;
  position: fixed;
  z-index: 2;
`;

const HanseiThonComponent: React.FC<HanseiThonProps> = ({ deemStatus }) => {
  return (
    <>
      {deemStatus && <Deem />}
      <Switch>
        <Route exact={true} path="/hanseithon/join" component={JoinPage} />
        <Route
          exact={true}
          path="/hanseithon/current"
          component={HTCurrentPage}
        />
        <Route
          exact={true}
          path="/hanseithon/participation"
          component={HTParticipationPage}
        />
        <Route exact={true} path="/hanseithon" component={HTMainPage} />
        <Redirect to="/error" />
      </Switch>
    </>
  );
};

export default HanseiThonComponent;
