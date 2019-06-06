import AutoLoginPage from 'pages/auth/autoLogin';
import LoginPage from 'pages/auth/login';
import PhoneCheckPage from 'pages/auth/phoneCheck';
import RecoveryPage from 'pages/auth/recovery';
import RegisterPage from 'pages/auth/register';
import MainPage from 'pages/main';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';

const App: React.FC = () => (
  <div id="app">
    <AutoLoginPage />
    <Switch>
      <Route path="/user/recovery" component={RecoveryPage} />
      <Route exact={true} path="/user/phone" component={PhoneCheckPage} />
      <Route exact={true} path="/user/register" component={RegisterPage} />
      <Route exact={true} path="/user/login" component={LoginPage} />
      <Route path="/" component={MainPage} />
      <Redirect to="/" />
    </Switch>
  </div>
);

export default App;
