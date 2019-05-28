import * as React from 'react';
import styled from 'styled-components';
import LunchImg from 'lib/svg/jumsim-illust.svg';
import EndImg from 'lib/svg/end-time-illust.svg';
import EndTimeComponent from './endTime';
import LunchTimeComponent from './lunchTime';

const Template = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const TimeWrapper = styled.div`
  height: 23.375rem;
  width: 40rem;
`;

const TimeBackGroundImg = styled.img`
  height: 23.375rem;
  width: 40rem;
`;

const TimeComponent: React.FC = () => {
  return (
    <Template>
      <TimeWrapper>
        <TimeBackGroundImg src={LunchImg} alt="Lunch Time Background Img" />
        <LunchTimeComponent />
      </TimeWrapper>
      <TimeWrapper>
        <TimeBackGroundImg src={EndImg} alt="End Time Background Img" />
        <EndTimeComponent />
      </TimeWrapper>
    </Template>
  );
};

export default TimeComponent;
