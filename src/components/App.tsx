import React from 'react';

import IEBlockComponent from 'components/ie-block';
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
import { ThemeProvider } from 'styled-components';
import { LightTheme, DarkTheme } from 'lib/styles';

const ErrorComponents = () => (
  <>
    <ErrorContainer />
    <FooterPage />
  </>
);

const App: React.FC = () => {
  const isIE: boolean = window.navigator.userAgent.indexOf('Trident') !== -1;

  return isIE ? (
    <IEBlockComponent />
  ) : (
    <ThemeProvider theme={LightTheme}>
      <AutoLoginContainer />
      <AutoErrorCheckContainer />
      <Switch>
        <Route path='/user/recovery' component={RecoveryPage} />
        <Route exact path='/user/phone' component={PhoneCheckPage} />
        <Route exact path='/user/register' component={RegisterPage} />
        <Route exact path='/user/login' component={LoginPage} />
        <Route exact path='/error' component={ErrorComponents} />
        <Route path='/service' component={servicePage} />
        <Route path='/' component={MainPage} />
        <Redirect to='/error' />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
