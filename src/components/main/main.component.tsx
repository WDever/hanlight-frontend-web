import * as React from 'react';

import FooterComponent from 'components/footer';
import HeaderContainer from 'container/header';
import { MainMethod, MainProps } from 'container/main';
import MainCalendarPage from 'pages/calendar/main-calendar';
import MainMealPage from 'pages/meal/main-meal';
import MainNoticePage from 'pages/notice/main-notice';
import MainTimePage from 'pages/timer';
import MainTimeTablePage from 'pages/timeTable/main-timeTable';
import MealPage from 'pages/meal/meal-detail';
import NoticePage from 'pages/notice/notice-detail';
import TimeTablePage from 'pages/timeTable/timeTable-detail';
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
  </>
);

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
      <Empty />
      <Switch>
        <Route exact={true} path="/" component={MainComponents} />
        <Route exact={true} path="/meal" component={MealPage} />
        <Route exact={true} path="/timetable" component={TimeTablePage} />
        <Route path="/notice" component={NoticePage} />
        <Redirect to="/" />
      </Switch>
      <FooterComponent />
    </>
  ) : (
    <></>
  );
};

export default MainComponent;
