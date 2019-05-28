import * as React from 'react';
import styled from 'styled-components';
import NoticePage from 'pages/main/notice';
import MealPage from 'pages/main/meal';
import TimeTable from 'pages/main/timeTable';
import Calendar from 'pages/main/calendar';
import TimeComponent from 'pages/main/time';
import { MainProps } from 'container/main';
import { RouteComponentProps } from 'react-router-dom';

const { useEffect } = React;

const MainComponent: React.FC<MainProps & RouteComponentProps> = ({ loginStatus, history }) => {
  const localLoginStatus = localStorage.getItem('loginStatus');
  useEffect(() => {
    if (localLoginStatus !== 'success') {
      history.push('/auth');
    }
  }, []);

  return (
    <>
      <NoticePage />
      <TimeComponent />
      <MealPage />
      <TimeTable />
      <Calendar />
    </>
  );
};

export default MainComponent;
