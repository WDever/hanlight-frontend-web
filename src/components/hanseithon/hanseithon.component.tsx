import * as React from 'react';

import JoinPage from 'pages/hanseithon/join';
import MainPage from 'pages/hanseithon/main';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { AppState } from 'store';
import styled from 'styled-components';

const Deem = styled.div`
  width: 100%;
  height: 92.6%;
  opacity: 0.6;
  background-color: #171717;
  position: absolute;
  z-index: 2;
`;

const HanseiThonComponent: React.FC = () => {
  const deemBoardStatus = useSelector<AppState, boolean>(
    state => state.board.deemBoardStatus,
  );

  return (
    <>
      {deemBoardStatus && <Deem />}
      <Switch>
        <Route exact={true} path="/hanseithon/join" component={JoinPage} />
        <Route exact={true} path="/hanseithon" component={MainPage} />
      </Switch>
    </>
  );
};

export default HanseiThonComponent;
