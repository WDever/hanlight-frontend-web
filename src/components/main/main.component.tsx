import * as React from 'react';
import styled from 'styled-components';
import NoticePage from 'pages/main/notice';
import MealPage from 'pages/main/meal';
import TimeTable from 'pages/main/timeTable';
import Schedule from 'pages/main/schedule';
import TimeComponent from 'pages/main/time';

const { useEffect } = React;

const MainComponent: React.FC = () => {
  return (
    <>
      <NoticePage />
      <TimeComponent />
      <MealPage />
      <TimeTable />
      <Schedule />
    </>
  );
};

export default MainComponent;
