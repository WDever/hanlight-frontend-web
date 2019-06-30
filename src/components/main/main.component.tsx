import * as React from 'react';

import BoardContainer from 'container/board/board.container';
import ErrorContainer from 'container/error';
import HeaderContainer from 'container/header';
import { MainMethod, MainProps } from 'container/main';
import CalendarPage from 'pages/calendar/detail-calendar';
import MainCalendarPage from 'pages/calendar/main-calendar';
import FooterPage from 'pages/footer';
import MealPage from 'pages/meal/detail-meal';
import MainMealPage from 'pages/meal/main-meal';
import NoticePage from 'pages/notice/detail-notice';
import MainNoticePage from 'pages/notice/main-notice';
import MainTimePage from 'pages/timer';
import TimeTablePage from 'pages/timeTable/detail-timeTable';
import MainTimeTablePage from 'pages/timeTable/main-timeTable';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import styled from 'styled-components';

const { useEffect } = React;

const Empty = styled.div`
  height: 3.75rem;
  width: 100%;
`;

const MainComponents = () => (
  <>
    <MainNoticePage />
    <MainTimePage />
    <MainMealPage />
    <MainTimeTablePage />
    <MainCalendarPage />
    <FooterPage />
  </>
);

const MainComponent: React.FC<MainProps & MainMethod & RouteComponentProps> = ({
  loginStatus,
  history,
  resetUser,
  location,
}) => {
  useEffect(() => {
    if (loginStatus === 'failure') {
      history.push('/user/login');
      resetUser();
    }
  }, [loginStatus]);

  const ErrorComponents = () => (
    <>
      <ErrorContainer />
      <FooterPage />
    </>
  );

  return loginStatus === 'success' ? (
    <>
      {location.pathname !== '/error' && (
        <>
          <HeaderContainer />
          <Empty />
        </>
      )}

      <Switch>
        <Route exact={true} path="/" component={MainComponents} />
        <Route exact={true} path="/calendar" component={CalendarPage} />
        <Route exact={true} path="/meal" component={MealPage} />
        <Route exact={true} path="/timetable" component={TimeTablePage} />
        <Route path="/notice" component={NoticePage} />
        <Route exact={true} path="/board" component={BoardContainer} />
        <Redirect to="/error" />
      </Switch>
    </>
  ) : (
    <></>
  );
};

export default MainComponent;
