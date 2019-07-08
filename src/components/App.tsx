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
import servicePage from 'pages/service';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

const ErrorComponents = () => (
  <>
    <ErrorContainer />
    <FooterPage />
  </>
);

const App: React.FC = () => (
  <>
    <AutoLoginContainer />
    <AutoErrorCheckContainer />
    <Switch>
      <Route path="/user/recovery" component={RecoveryPage} />
      <Route exact={true} path="/user/phone" component={PhoneCheckPage} />
      <Route exact={true} path="/user/register" component={RegisterPage} />
      <Route exact={true} path="/user/login" component={LoginPage} />
      <Route exact={true} path="/error" component={ErrorComponents} />
      <Route path="/service" component={servicePage} />
      <Route path="/" component={MainPage} />
      <Redirect to="/error" />
    </Switch>
  </>
);

export default App;
