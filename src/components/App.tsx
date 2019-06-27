import React from 'react';

import AutoErrorCheckContainer from 'container/auto/autoErrorCheck';
import AutoLoginContainer from 'container/auto/autoLogin';
import ErrorContainer from 'container/error';
import LoginPage from 'pages/auth/login';
import PhoneCheckPage from 'pages/auth/phoneCheck';
import RecoveryPage from 'pages/auth/recovery';
import RegisterPage from 'pages/auth/register';
import FooterPage from 'pages/footer';
import MainPage from 'pages/main';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

const Base = styled.div`
  width: 100%;
  height: 100%;
`;

const ErrorComponents = () => (
  <>
    <ErrorContainer />
    <FooterPage />
  </>
);

const App: React.FC = () => (
  <Base>
    <AutoLoginContainer />
    <AutoErrorCheckContainer />
    <Switch>
      <Route path="/user/recovery" component={RecoveryPage} />
      <Route exact={true} path="/user/phone" component={PhoneCheckPage} />
      <Route exact={true} path="/user/register" component={RegisterPage} />
      <Route exact={true} path="/user/login" component={LoginPage} />
      <Route path="/" component={MainPage} />
      <Route exact={true} path="/error" component={ErrorComponents} />
      <Redirect to="/error" />
    </Switch>
  </Base>
);

export default App;
