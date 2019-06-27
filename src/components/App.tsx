import React from 'react';

import AutoLoginPage from 'pages/auth/autoLogin';
import LoginPage from 'pages/auth/login';
import PhoneCheckPage from 'pages/auth/phoneCheck';
import RecoveryPage from 'pages/auth/recovery';
import RegisterPage from 'pages/auth/register';
import MainPage from 'pages/main';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

const Base = styled.div`
  width: 100%;
  height: 100%;
`;

const App: React.FC = () => (
  <Base>
    <AutoLoginPage />
    <Switch>
      <Route path="/user/recovery" component={RecoveryPage} />
      <Route exact={true} path="/user/phone" component={PhoneCheckPage} />
      <Route exact={true} path="/user/register" component={RegisterPage} />
      <Route exact={true} path="/user/login" component={LoginPage} />
      <Route path="/" component={MainPage} />
    </Switch>
  </Base>
);

export default App;
