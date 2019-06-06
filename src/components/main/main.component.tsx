import FooterComponent from 'components/footer';
import HeaderContainer from 'container/header';
import { MainMethod, MainProps } from 'container/main';
import Calendar from 'pages/main/calendar';
import MealPage from 'pages/main/meal';
import NoticePage from 'pages/main/notice';
import TimePage from 'pages/main/timer';
import TimeTablePage from 'pages/main/timeTable';
import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

const { useEffect } = React;

const MainComponent: React.FC<MainProps & MainMethod & RouteComponentProps> = ({
  loginStatus,
  history,
  resetUser,
}) => {
  useEffect(() => {
    if (loginStatus === 'failure') {
      history.push('/user/login');
      resetUser();
    }
  }, [loginStatus]);

  return loginStatus === 'success' ? (
    <>
      <HeaderContainer />
      <Switch>
        <Route
          exact={true}
          path="/"
          component={() => (
            <>
              <NoticePage />
              <TimePage />
              <MealPage />
              <TimeTablePage />
              <Calendar />
            </>
          )}
        />
        <Route exact={true} path="/meal" component={() => <></>} />
        <Redirect to="/" />
      </Switch>
      <FooterComponent />
    </>
  ) : (
    <></>
  );
};

export default MainComponent;
