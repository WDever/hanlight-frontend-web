import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import PhoneCheckPage from 'pages/auth/phoneCheck';
import LoginPage from 'pages/auth/login';
import RegisterPage from 'pages/auth/register';

const App: React.FC = () => (
  <div id="app">
    <Switch>
      <Route exact path="/auth/register/create" component={RegisterPage} />
      <Route exact path="/auth/register" component={PhoneCheckPage} />
      <Route exact path="/auth" component={LoginPage} />
      <Route exact path="/" component={() => <div>home</div>} />
      <Redirect to="/" />
    </Switch>
  </div>
);

export default App;
