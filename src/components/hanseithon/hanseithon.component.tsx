import * as React from 'react';

import HTMainPage from 'pages/hanseithon/main';
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

const HanseiThonComponent: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact={true} path="/hanseithon" component={HTMainPage} />
        <Redirect to="/error" />
      </Switch>
    </>
  );
};

export default HanseiThonComponent;
