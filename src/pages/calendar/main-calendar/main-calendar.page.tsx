import CalendarContainer from 'container/calendar/main-calendar';
import * as React from 'react';
import styled from 'styled-components';

const Template = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 35rem;
`;

const Title = styled.div`
  max-width: 81rem;
  width: 90%;
  font-family: 'yg-jalnan';
  font-size: 1.875rem;
  margin-bottom: 2rem;
`;

const MainCalendarPage: React.FC = () => (
  <Template>
    <Title>학사일정</Title>
    <CalendarContainer />
  </Template>
);

export default MainCalendarPage;
