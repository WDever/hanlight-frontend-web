import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from 'components/privateRoute';
import PhoneCheckPage from 'pages/auth/phoneCheck';
import LoginPage from 'pages/auth/login';
import RegisterPage from 'pages/auth/register';
import MainPage from 'pages/main';
import IdFindPage from 'pages/auth/idFind';
import PwFindPage from 'pages/auth/pwFind';

const RouteComponent: React.FC = () => (
  <Switch>
    <Route exact path="/auth/register/create" component={RegisterPage} />
    <Route exact path="/auth/idFind" component={IdFindPage} />
    <Route exact path="/auth/pwFind" component={PwFindPage} />
    <Route exact path="/auth/register" component={PhoneCheckPage} />
    <Route exact path="/auth" component={LoginPage} />
    <PrivateRoute
      exact
      path="/"
      enter={!!localStorage.getItem('accessToken')}
      redirectLocation="/auth"
      component={MainPage}
    />
    <Redirect to="/" />
  </Switch>
);

export default RouteComponent;
