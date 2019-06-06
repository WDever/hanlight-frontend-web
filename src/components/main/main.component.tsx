import FooterComponent from 'components/footer';
import HeaderContainer from 'container/header';
import { MainMethod, MainProps } from 'container/main';
import Calendar from 'pages/main/calendar';
import MealPage from 'pages/main/meal';
import NoticePage from 'pages/main/notice';
import TimePage from 'pages/main/time';
import TimeTablePage from 'pages/main/timeTable';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

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
      <>
        <NoticePage />
        <TimePage />
        <MealPage />
        <TimeTablePage />
        <Calendar />
      </>
      <FooterComponent />
    </>
  ) : (
    <></>
  );
};

export default MainComponent;
