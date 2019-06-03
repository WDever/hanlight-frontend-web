import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import PhoneCheckPage from 'pages/auth/phoneCheck';
import LoginPage from 'pages/auth/login';
import RegisterPage from 'pages/auth/register';
import MainPage from 'pages/main';
import RecoveryPage from 'pages/auth/recovery';

const App: React.FC = () => (
  <div id='app'>
    <Switch>
      <Route path='/user/recovery' component={RecoveryPage} />
      <Route exact path='/user/phone' component={PhoneCheckPage} />
      <Route exact path='/user/register' component={RegisterPage} />
      <Route exact path='/auth' component={LoginPage} />
      <Route exact path='/' component={MainPage} />
      {/* <PrivateRoute exact path="/" enter={!!localStorage.getItem('accessToken')} redirectLocation="/auth" component={MainPage} /> */}
      <Redirect to='/' />
    </Switch>
  </div>
);

export default App;
