import * as React from 'react';
import styled from 'styled-components';
import TimeTableContainer from 'container/main/timeTable';

const { useEffect } = React;

const Template = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 33.375rem;
  /* height: 21rem; */
`;

const Title = styled.div`
  width: 95%;
  font-family: 'yg-jalnan';
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const Colored = styled.span`
  color: #4470ff;
`;

const TimeTablePage: React.FC = () => {
  const name = localStorage.getItem('name');

  return (
    <Template>
      <Title>
        <Colored>
          {name}
        </Colored>
님의 시간표
      </Title>
      <TimeTableContainer />
    </Template>
  );
};

export default TimeTablePage;
