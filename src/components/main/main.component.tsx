import * as React from 'react';

import BoardContainer from 'container/board/board.container';
import HeaderContainer from 'container/header';
import HeaderMenuContainer from 'container/header/menu';
import { MainMethod, MainProps } from 'container/main';
import ProfileContainer from 'container/profile';
import { Device } from 'lib/styles';
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
import styled, { css } from 'styled-components';

const { useEffect } = React;

const Empty = styled.div`
  height: 3.75rem;
  width: 100%;
`;

const Template = styled.div<{ toggleMenuStatus: boolean }>`
  ${({ toggleMenuStatus }) =>
    toggleMenuStatus &&
    css`
      overflow: hidden;
      position: fixed;
      width: 100%;
      height: 100%;
    `}
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
  history,
  location,
  match,
  loginStatus,
  resetUser,
  toggleMenuStatus,
}) => {
  useEffect(() => {
    if (loginStatus === 'failure') {
      history.push('/user/login');
      resetUser();
    }
  }, [loginStatus]);

  return loginStatus === 'success' ? (
    <Template toggleMenuStatus={toggleMenuStatus}>
      {location.pathname !== '/error' && (
        <>
          <HeaderContainer />
          {toggleMenuStatus && (
            <HeaderMenuContainer
              logout={() => {
                resetUser();
              }}
            />
          )}
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
        <Route exact={true} path="/profile" component={ProfileContainer} />
        <Redirect to="/error" />
      </Switch>
    </Template>
  ) : (
    <></>
  );
};

export default MainComponent;
