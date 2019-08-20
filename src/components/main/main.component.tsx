import * as React from 'react';

import HMMainComponent from 'components/hanlight-music/main';
import BoardContainer from 'container/board/board.container';
import HeaderContainer from 'container/header';
import HeaderMenuContainer from 'container/header/menu';
import { MainMethod, MainProps } from 'container/main';
import ProfileContainer from 'container/profile';
import CalendarPage from 'pages/calendar/detail-calendar';
import MainCalendarPage from 'pages/calendar/main-calendar';
import FooterPage from 'pages/footer';
import HanseiThonPage from 'pages/hanseithon';
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
  history,
  location,
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
    <div
      style={
        toggleMenuStatus
          ? {
              overflow: 'hidden',
              position: 'fixed',
              width: '100%',
              height: '100%',
            }
          : undefined
      }
    >
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
        <Route exact={true} path="/music" component={HMMainComponent} />
        <Route path="/hanseithon" component={HanseiThonPage} />
        <Redirect to="/error" />
      </Switch>
    </div>
  ) : (
    <></>
  );
};

export default MainComponent;
