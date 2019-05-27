import * as React from 'react';
import styled from 'styled-components';
import NoticePage from 'pages/main/notice';
import MealPage from 'pages/main/meal';
import TimeTable from 'pages/main/timeTable';
import Calendar from 'pages/main/calendar';
import TimeComponent from 'pages/main/time';

const MainComponent: React.FC = () => {
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
