import * as React from 'react';
import styled from 'styled-components';
import CalendarContainer from 'container/main/calendar';

const Template = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50rem;
`;

const Title = styled.div`
  width: 95%;
  font-family: 'yg-jalnan';
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const SchedulePage: React.FC = () => (
  <Template>
    <Title>학사일정</Title>
    <CalendarContainer />
  </Template>
);

export default SchedulePage;
