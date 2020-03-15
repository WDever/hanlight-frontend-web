import React, { useEffect } from 'react';

import BoardContainer from 'container/board/board.container';
import HeaderContainer from 'container/header';
import HeaderMenuContainer from 'container/header/menu';
import { MainMethod, MainProps } from 'container/main';
import ProfileContainer from 'container/profile';
import CalendarPage from 'pages/calendar/detail-calendar';
import MealPage from 'pages/meal/detail-meal';
import NoticePage from 'pages/notice/detail-notice';
import TimeTablePage from 'pages/timeTable/detail-timeTable';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import styled, {
  css,
  ThemeProps,
  DefaultTheme,
  FlattenInterpolation,
} from 'styled-components';
import MainPage from 'pages/main';

/* eslint-disable @typescript-eslint/typedef */

const Template = styled.div<{ toggleMenuStatus: boolean }>`
  ${({ toggleMenuStatus }): FlattenInterpolation<ThemeProps<DefaultTheme>> =>
    toggleMenuStatus
      ? css`
          overflow: hidden;
          position: fixed;
          width: 100%;
          height: 100%;
        `
      : css`
          background-color: ${({ theme }): string => theme.common.bg};
        `}
`;

/* eslint-enable @typescript-eslint/typedef */

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
        </>
      )}

      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route exact path='/calendar' component={CalendarPage} />
        <Route exact path='/meal' component={MealPage} />
        <Route exact path='/timetable' component={TimeTablePage} />
        <Route path='/notice' component={NoticePage} />
        <Route exact path='/board' component={BoardContainer} />
        <Route exact path='/profile' component={ProfileContainer} />
        <Redirect to='/error' />
      </Switch>
    </Template>
  ) : (
    <></>
  );
};

export default MainComponent;
